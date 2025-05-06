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
      <section className="shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gradient-to-b from-gray-50 to-white border dark:border-white/10 border-gray-200">
        {/* 상단 관리자 컨트롤 바 */}
        <div className="flex items-center bg-zinc-900 justify-center py-2">
          <div className="max-w-[calc(100%-112px)] w-full items-center flex">
            <div className="text-xs flex items-center gap-2">
              <Info size={14} className="text-white" />
              <span className="text-indigo-100">
                ESC를 누르면 팝업창이 닫힙니다.
              </span>
            </div>
            <div className="w-full text-right flex justify-end flex-1 divide-x divide-zinc-700">
              <span
                className="text-xs cursor-pointer px-3 py-1 text-white hover:text-indigo-300 transition-colors"
                onClick={() => nav(`/project/write?edit=${id}`)}
              >
                수정
              </span>
              <span
                className="text-xs cursor-pointer px-3 py-1 text-white hover:text-red-300 transition-colors"
                onClick={deleteConfirm}
              >
                삭제
              </span>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-[300px_auto] divide-x divide-zinc-200 dark:divide-zinc-700 p-8 bg-zinc-50 dark:bg-zinc-900">
          {/* 왼쪽 사이드바 정보 */}
          <div className="break-keep flex flex-col gap-8 items-start pr-8">
            {/* 제목 및 설명 */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl leading-tight font-Montserrat font-bold text-zinc-900 dark:text-white">
                {title}
              </h1>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {description}
              </p>
            </div>

            {/* 작업 기간 */}
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-Montserrat font-bold text-indigo-600 dark:text-indigo-400">
                WORK RANGE
              </h1>
              <div className="flex text-xs items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Calendar size={15} /> {start_date} - {end_date}
              </div>
            </div>

            {/* 기술 스택 */}
            <article>
              <h1 className="text-lg font-semibold font-Montserrat mb-3 text-indigo-600 dark:text-indigo-400">
                Stack
              </h1>
              <div className="flex flex-wrap gap-2">
                {project_meta_stack.map((e, idx) => (
                  <div
                    key={`stack:${idx}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                  >
                    {e.project_stack.stack}
                  </div>
                ))}
              </div>
            </article>

            {/* 보기 버튼 */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-4 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors border-none"
            >
              View <Link2Icon size={16} />
            </Button>
          </div>

          {/* 오른쪽 콘텐츠 영역 */}
          <div className="flex-1 pl-8">
            {/* 썸네일 이미지 */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <img
                src={`${IMG_URL}/${thumbnail}`}
                alt={title}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
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
                    className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-white/50 dark:bg-zinc-800/50 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.contents}
                    </AccordionContent>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
