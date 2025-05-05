import { IMG_URL } from "@/constants/apiUrl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import NotfoundPage from "@/component/error/NotfoundPage";

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
import { Calendar, Info, Link, Link2Icon } from "lucide-react";
import ProjectDetailSkeleton from "./project-detail-skeleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type DetailProps = {
  company: string;
  description: string;
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
    project_stack: { id: number; type: string; stack: string };
  }>;
  project_surmmry: Array<{ id: number; title: string; contents: string }>;
};

const ProjectDetail = ({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) => {
  const nav = useNavigate();
  const queryclient = useQueryClient();

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
      closeModal();
    },
  });

  const deleteConfirm = () => {
    if (!confirm("삭제하시겠습니까?")) return;
    mutate(id);
  };

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (isError || !data) {
    return <NotfoundPage redirectPath={"/project"} />;
  }

  const {
    title,
    thumbnail,
    description,
    start_date,
    end_date,
    project_contents,
    project_meta_stack,
    project_surmmry,
  } = data[0] as DetailProps;

  return (
    <>
      <section className="shadow-2xl animate-wiggle">
        <div className="flex items-center bg-zinc-900 justify-center py-2">
          <div className=" max-w-[calc(100%-112px)] w-full items-center flex">
            <div className="text-xs flex items-center gap-2">
              <Info size={14} className="text-white" />
              <span className="text-indigo-100">
                ESC를 누르면 팝업창이 닫힙니다.
              </span>
            </div>
            <div className="w-full text-right flex  justify-end flex-1 divide-x">
              <span
                className="text-xs  cursor-pointer px-2"
                onClick={() => nav(`/project/write?edit=${id}`)}
              >
                수정
              </span>
              <span
                className="text-xs cursor-pointer px-2"
                onClick={deleteConfirm}
              >
                삭제
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[300px_auto] divide-x divide-border p-14 bg-zinc-50 dark:bg-[#191919]">
          <div className=" break-keep flex flex-col gap-12 items-start pr-10">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl leading-12 font-Montserrat font-bold">
                {title}
              </h1>
              <p className="text-base leading-7 text-foreground/70">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl flex gap-2 items-center font-Montserrat font-bold text-indigo-200">
                WORK RANGE
              </h1>
              <div className="flex text-xs items-center gap-3 ">
                <Calendar size={15} /> {start_date} - {end_date}
              </div>
            </div>
            <article>
              <h1 className="text-xl font-semibold font-Montserrat text-indigo-200">
                Stack
              </h1>
              <div className="flex flex-wrap gap-2">
                {project_meta_stack.map((e, idx) => (
                  <div
                    key={`stack:${idx}`}
                    className=" text-xs p-2 rounded-lg  border border-indigo-300/20"
                  >
                    {e.project_stack.stack}
                  </div>
                ))}
              </div>
            </article>
            <Button
              variant={"outline"}
              className="w-full text-xs border border-foreground/30 rounded-xs bg-indigo-00!"
            >
              View <Link2Icon />
            </Button>
          </div>

          <div className="p-0 flex-1 pl-10">
            <img
              src={`${IMG_URL}/${thumbnail}`}
              alt=""
              className="border border-border w-[100%] rounded-xl"
            />

            <Accordion
              type="single"
              collapsible
              className="w-full my-7 flex flex-col gap-3"
            >
              {project_surmmry.map((item, idx) => {
                return (
                  <AccordionItem
                    value={`${idx}`}
                    key={`${idx}-acodian`}
                    className=" border-0!  "
                  >
                    <AccordionTrigger className=" px-4 border-zinc-200  dark:bg-zinc-800">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="p-3">
                      {item.contents}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <EditorProvider editor={editor}>
              {project_contents.length > 0 && (
                <EditorProvider editor={editor}>
                  <SimpleEditorContents
                    value={HtmlContentNormalizer.setImgUrl(
                      project_contents[0].contents
                    )}
                  />
                </EditorProvider>
              )}
            </EditorProvider>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
