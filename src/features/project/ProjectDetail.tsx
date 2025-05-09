import { IMG_URL } from "@/constants/apiUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import NotfoundPage from "@/component/error/NotfoundPage";
import ProjectSvg from "@/asset/project/project-detail.svg?react";
import {
  EditorProvider,
  SimpleEditorContents,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { HtmlContentNormalizer } from "@/utils/HtmlContentNormalizer";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  Calendar1,
  Code,
  Code2,
  ExternalLink,
  Info,
  Link,
  Link2Icon,
  List,
  Users,
} from "lucide-react";
import ProjectDetailSkeleton from "./project-detail-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "@/store/zustandStore";
import { cn } from "@/lib/utils";
import { STACK_TYPES } from "@/type/ProjectTypes";
import { DateUtils } from "@/utils/dateUtil";

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
              project_stack(stack, type)
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

  const { editor } = useSimpleEditor({ editable: false });

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      try {
        const { data } = await SupabasePool.getInstance().auth.getSession();
        if (!data.session) {
          throw new Error("권한이 없습니다.");
        }

        const pool = SupabasePool.getInstance();
        const { error } = await pool.from("project_meta").delete().eq("id", id);

        if (error) {
          throw new Error(error.message);
        }
      } catch (err) {}
    },
    onSuccess: async () => {
      toast.success("삭제되었습니다.");
      await queryclient.invalidateQueries({
        queryKey: ["project-list"],
      });
    },
  });

  if (isLoading) {
    return <ProjectDetailSkeleton />;
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
  } = data[0] as DetailProps;

  return (
    <>
      <section className="break-keep flex flex-col gap-8 items-start mb-10">
        {/* 제목 및 설명 */}
        <div className="flex flex-col gap-4 pl-5 border-l-3 border-indigo-300">
          <div className="flex  flex-col  gap-4 ">
            <ProjectSvg className="[&>g]:fill-white size-12" />
            <h1 className="text-3xl leading-tight text-zinc-900 dark:text-white">
              {title}
            </h1>
          </div>
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300 max-w-[500px]">
            {description}
          </p>
        </div>

        <div className="border-y py-1 w-full [&>button]:text-xs [&>button]:px-4 flex  border-border divide-x divide-border animate-topIn opacity-0 ani-delay-0.3">
          <button
            className="flex gap-2 items-center opacity-70 hover:opacity-100"
            onClick={() => nav("/blog")}
          >
            <List size={13} />
            목록으로
          </button>
          <button
            className="flex gap-2 items-center opacity-70 hover:opacity-100"
            onClick={() =>
              window.open(`https://blog.h-creations.com/post/${id}`, "_blank")
            }
          >
            <Link2Icon size={13} /> Project 바로가기
          </button>
          {login && (
            <>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="ml-auto py-0!"
                onClick={() => nav(`/project/write?edit=${id}`)}
              >
                수정
              </Button>
              <Button
                onClick={deleteConfirm}
                size={"sm"}
                variant={"ghost"}
                className=" py-0!"
              >
                삭제
              </Button>
            </>
          )}
        </div>

        <div className="grid gap-5 mt-5 items-start justify-start">
          <div
            className="flex flex-col gap-2 "
            style={{
              backdropFilter: "blur(5px)",
            }}
          >
            <h3 className="text-base tracking-wider flex gap-3 items-center text-white ">
              <Calendar1 size={18} className="text-indigo-200" />

              <span className="bg-gradient-to-r tracking-tighter  font-SUIT-Regular from-white to-indigo-200 bg-clip-text text-transparent">
                작업기간 / 유지보수 기간
              </span>
            </h3>
            <div className="flex text-xs items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="text-xs px-2.5 py-1 flex gap-2 items-centers rounded-full border border-indigo-500/30 text-indigo-200">
                {DateUtils.getDurationDays(start_date, end_date)} 일
              </span>
              <span>
                {start_date} - {end_date}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <h3 className="text-base tracking-wider flex gap-3 items-center text-white ">
              <Users size={18} className="text-indigo-200" />
              <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent  tracking-tighter  font-SUIT-Regular">
                참여인원
              </span>
            </h3>
            <div className="flex text-xs items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="text-xs px-2.5 py-1 flex gap-2 items-centers rounded-full border border-indigo-500/30 text-indigo-200">
                {project_member}
              </span>
            </div>
          </div>{" "}
          <article className="col-span-2 mt-7">
            <div className="   border-white/10">
              <h3 className="text-lg tracking-wider mb-2 flex gap-3 items-center text-white ">
                <Code2 size={18} className="text-indigo-200" />
                <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent  tracking-tighter  font-SUIT-Regular">
                  사용스택
                </span>
              </h3>
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full inline-block bg-indigo-200"></span>{" "}
                  <span className="text-xs opacity-60">Framework & langes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full  inline-block bg-indigo-400"></span>{" "}
                  <span className="text-xs opacity-60">lib</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full inline-block bg-indigo-600"></span>{" "}
                  <span className="text-xs opacity-60">style</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project_meta_stack.map((e, idx) => {
                return (
                  <div
                    key={`stack:${idx}`}
                    className={cn(
                      "text-xs p-2 px-3 rounded-full bg-zinc-50/3 border  text-indigo-300 border-indigo-200/50"
                      // e.project_stack.type === "framework" && "text-red-300",
                      // e.project_stack.type === "lib" && "text-orange-300",
                      // e.project_stack.type === "style" && "text-teal-400"
                    )}
                  >
                    {e.project_stack.stack}
                  </div>
                );
              })}
            </div>
          </article>
        </div>
        {/* 기술 스택 */}

        {/* 보기 버튼 */}
        <button className="text-xs flex rounded-lg w-1/2 items-center py-3 gap-2 justify-center article-hover p-2">
          웹 사이트 바로가기{" "}
          <Link2Icon size={14} className="opacity-50 rotate-45" />
        </button>
      </section>
      <section className="flex-1">
        {/* 썸네일 이미지 */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <img
            src={`${IMG_URL}/${thumbnail}`}
            alt={title}
            className="w-full h-auto "
          />
        </div>

        {/* 아코디언 요약 정보 */}
        <Accordion
          type="single"
          collapsible
          className="w-full my-6 flex flex-col gap-3"
        >
          {project_surmmry.map((item, idx) => {
            return (
              <AccordionItem
                value={`${idx}`}
                key={`${idx}-acodian`}
                className="outline px-4 overflow-hidden rounded-sm outline-border"
              >
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.contents}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* 프로젝트 상세 내용 */}
        <div className="mt-6 prose dark:prose-invert prose-sm max-w-none">
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
      </section>
    </>
  );
};

export default ProjectDetail;
