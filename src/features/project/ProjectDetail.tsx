import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import NotfoundPage from "@/components/error/NotfoundPage";

import {
  EditorProvider,
  SimpleEditorContents,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { HtmlContentNormalizer } from "@/utils/HtmlContentNormalizer";

import { ChevronLeft, HomeIcon, Link2 } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "@/store/zustandStore";
import { type STACK_TYPES } from "@/type/ProjectTypes";
import { DateUtils } from "@/utils/dateUtil";
import LoadingSpiner from "@/components/ui/loading-spiner";
import ProjectImgWrapper from "./components/projectimg-wrapper";
import React from "react";
import StackIconMapper from "@/components/shared/stack-iconmapper";
import { useGSAP } from "@gsap/react";
export type DetailProps = {
  company: string;
  description: string;
  project_member: string;
  end_date: string;
  id: number;
  img_key: string;
  project_url: string;
  start_date: string;
  thumbnail: string;
  title: string;
  project_contents: Array<{
    id: number;
    contents: string;
  }>;
  project_meta_stack: Array<{
    project_stack: { id: number; type: STACK_TYPES; stack: string };
  }>;
  project_surmmry: Array<{ id: number; title: string; contents: string }>;
};

const ProjectDetail = () => {
  const nav = useNavigate();
  const queryclient = useQueryClient();
  const { id } = useParams();

  const login = useStore((state) => state.userAuth.login);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`PROJECT_DETAIL:${id}`],
    queryFn: async () => {
      return await requestHandler(async () => {
        const response = await SupabasePool.getInstance()
          .from("project_meta")
          .select(
            `
            *,
            project_contents(*),
            project_meta_stack(
              project_stack(id,stack, type)
            ),
            project_surmmry(title,contents)
          `
          )
          .eq("id", id);

        if (response.error || !response.data || response.data.length === 0) {
          throw new Error(
            `요청 실패 : ${response.error?.message ?? "데이터 없음"}`
          );
        }

        return response;
      });
    },
    staleTime: Infinity,
  });

  // const { handler } = useUploader();
  const { editor } = useSimpleEditor({
    editable: false,
    // uploadCallback: () => {},
  });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await SupabasePool.getInstance().auth.getSession();
      if (!data.session) {
        throw new Error("권한이 없습니다.");
      }

      const pool = SupabasePool.getInstance();
      const { error } = await pool.from("project_meta").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: async () => {
      toast.success("삭제되었습니다.");
      await queryclient.invalidateQueries({
        queryKey: ["project-list"],
      });
    },
  });

  useGSAP(() => {}, {});

  if (isLoading) {
    return (
      <div className="relative min-h-[400px]">
        <LoadingSpiner />
      </div>
    );
  }

  if (isError || !data || !id) {
    return <NotfoundPage redirectPath={"/project"} />;
  }

  const deleteConfirm = () => {
    if (!confirm("삭제하시겠습니까?")) return;
    mutate(+id);
  };

  const {
    title,
    thumbnail,
    description,
    start_date,
    end_date,
    project_member,
    project_contents,
    project_meta_stack,
    project_surmmry,
    project_url,
  } = data[0] as DetailProps;

  const groupingStack = (stackArr: DetailProps["project_meta_stack"]) => {
    const hashMap: Record<string, string[]> = {};
    for (const item of stackArr) {
      const type = item.project_stack.type;
      if (!hashMap[type]) {
        hashMap[type] = [item.project_stack.stack];
      } else {
        hashMap[type].push(item.project_stack.stack);
      }
    }

    return hashMap;
  };

  return (
    <>
      <section className="flex flex-col gap-12 max-w-4xl mx-auto -mt-[70px] md:mt-auto border-b pb-10 border-border">
        {/* 헤더 및 네비게이션 */}
        <div className="flex items-center gap-4 border-b pb-3 border-border  ani-delay-0.1 ">
          <div
            className="items-center gap-2 text-sm hidden md:flex border p-2 rounded-xl border-border"
            onClick={() => nav("/project")}
          >
            <ChevronLeft size={15} />
          </div>
          <span className="opacity-30 md:block hidden">|</span>
          <div className="text-[11px] tracking-wider text-white/60 flex items-center gap-2">
            <span
              className="cursor-pointer hover:text-indigo-200 hover:underline flex items-center"
              onClick={() => nav("/")}
            >
              <HomeIcon size={15} />
            </span>
            <span>/</span>
            <span
              className="cursor-pointer hover:text-indigo-200 hover:underline"
              onClick={() => nav("/project")}
            >
              PROJECT
            </span>
            <span>/</span> {title}
          </div>{" "}
          {login && (
            <div className="flex gap-2 ml-auto">
              <button
                className="text-xs bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 transition-colors"
                onClick={() => nav(`/project/write?edit=${id}`)}
              >
                수정
              </button>
              <button
                onClick={deleteConfirm}
                className="text-xs bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 transition-colors"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-7 items-start ">
          <div className=" md:mt-5 justify-between  ani-delay-0.3  ">
            {/* <img src="/public/img/gear.png" className="w-22" /> */}

            <div className="flex flex-col gap-10">
              <h1 className="font-semibold border-border relative font-Montserrat inline-flex gap-4 items-center hover:text-indigo-100 text-3xl md:text-5xl leading-tight text-white  transition-all cursor-pointer tracking-tight">
                {title}
              </h1>{" "}
              <div className="flex flex-col">
                <p className=" text-sm text-muted-foreground">프로젝트 설명</p>

                <span className="text-sm max-w-[500px] leading-relaxed break-keep">
                  {description}
                </span>
              </div>
              <article className="items-center flex gap-10">
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground  ">
                    작업기간 & 유지보수
                  </p>
                  <p className=" text-xs md:text-base md:font-medium">
                    {DateUtils.getDurationDays(start_date, end_date)}일
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground ">투입인원</p>
                  <span className="text-sm">{project_member}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground ">Deply URL</p>

                  <button
                    className="text-sm w-full items-center justify-center  gap-1 bg-transparent! border-b flex text-indigo-300 hover:text-teal-300"
                    onClick={() => window.open(project_url, "_blank")}
                  >
                    <span className="rotate-135">
                      <Link2 size={16} />
                    </span>
                    {project_url}
                  </button>
                </div>
              </article>
              <div className="flex flex-col gap-4   rounded-lg ">
                <article className="space-y-2  md:col-span-2 mt-1">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground ">사용스택</p>
                  </div>

                  <div className="grid grid-cols-[auto_1fr]   divide-indigo-200/10  [&>div]:p-2">
                    <div className="text-xs bg-zinc-950/30">카테고리</div>
                    <div className="text-xs bg-zinc-950/30">스킬</div>

                    {(() => {
                      const stackObj = groupingStack(project_meta_stack);
                      const keys = Object.keys(stackObj);
                      return keys.map((k, idx) => {
                        const stacks = stackObj[k];
                        return (
                          <React.Fragment key={`${k}:${idx}`}>
                            <div className=" md:text-lg text-zinc-300 flex items-center gap-3 border-r border-b">
                              <span className=" font-medium text-xs md:text-xs flex  items-center ">
                                {k}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 border-b border-indigo-200/10">
                              {stacks.map((st, idx) => {
                                return (
                                  <span
                                    key={`${st}:${idx}`}
                                    className="text-xs border border-indigo-200/20 md:text-xs p-1 md:px-2.5  bg-white/2 rounded-lg flex items-center gap-2"
                                  >
                                    {StackIconMapper({ stackName: st })}
                                    {st}
                                  </span>
                                );
                              })}
                            </div>
                          </React.Fragment>
                        );
                      });
                    })()}
                  </div>
                </article>
              </div>
              <div className="w-full border border-border">
                <ProjectImgWrapper url={thumbnail} alt={title} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 mt-10 mb-20 flex-col gap-5">
        <h1 className="text-2xl font-semibold ">주요 기능</h1>
        <div className="flex flex-col gap-8 mt-3">
          {project_surmmry.map((item, idx) => {
            return (
              <div
                className="flex flex-col gap-2"
                key={`${item.id}:${idx}:list`}
              >
                <h3 className="font-semibold leading-relaxed text-indigo-200">
                  {idx + 1}. {item.title}
                </h3>
                <p className="text-sm text-white/90 pl-2 leading-relaxed max-w-[600px] break-keep">
                  {item.contents}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      {/* 프로젝트 상세 내용 */}
      <section>
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <h1 className="text-2xl  font-semibold">상세 내용</h1>
          {project_contents.length > 0 && (
            <EditorProvider editor={editor}>
              <SimpleEditorContents
                value={HtmlContentNormalizer.setImgUrl(
                  project_contents[0].contents
                )}
              />
            </EditorProvider>
          )}
        </div>
      </section>{" "}
    </>
  );
};

export default ProjectDetail;
