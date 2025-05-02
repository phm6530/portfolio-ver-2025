import "quill/dist/quill.snow.css";

import { useNavigate, useParams } from "react-router-dom";
import QuillView from "@/component/editor/QuillView";
import ProjectDetailControlsWrap from "@/features/project/ProjectDetailControls/ProjectDetailControlsWrap";

import { ProjectPostProps } from "@/type/ProjectTypes";
import { IMG_URL } from "@/constants/apiUrl";
import styled from "styled-components";

import ProjectNextPrevNav from "@/features/project/ProjectNextPrevNav";
import Prograssbar from "@/component/ui/Prograssbar";
import Icon from "@/component/icon/Icon";
import FadeInAnimation from "@/component/animations/FadeInAnimation";
import EmbosingButton from "@/component/ui/EmbosingButton";
import { HashTag } from "@/style/commonStyle";
import { device } from "@/config/DeviceConfig";
import useStore from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
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
import { AccordionDemo } from "./project-acodian";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type DetailProps = {
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
    project_stack: { type: string; stack: string };
  }>;
  project_surmmry: Array<{ title: string; contents: string }>;
};

const ProjectDetail = ({ id }: { id: number }) => {
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
  if (isLoading) {
    return "loading.....";
  }

  if (isError || !data) {
    return <NotfoundPage redirectPath={"/project"} />;
  }

  const {
    title,
    thumbnail,
    description,
    project_contents,
    project_meta_stack,
    project_surmmry,
  } = data[0] as DetailProps;

  return (
    <section className="grid grid-cols-[300px_auto] gap-20  bg-background my-20 p-15 shadow-2xl ">
      <div className=" break-keep flex flex-col gap-7">
        <h1 className="text-3xl leading-12">{title}</h1>
        <p className="text-base leading-7">{description}</p>
        <article>
          <h1>Stack</h1>
          <div className="flex flex-wrap gap-2">
            {project_meta_stack.map((e) => (
              <div className="border rounded-full text-xs p-2  border-indigo-500 text-indigo-600">
                {e.project_stack.stack}
              </div>
            ))}
          </div>
        </article>
        <Button
          variant={"ghost"}
          className="w-full text-xs border border-foreground/30"
        >
          VIEW
        </Button>
      </div>

      <div className="p-0 flex-1">
        <img
          src={`${IMG_URL}/${thumbnail}`}
          alt=""
          className="border border-foreground/30 w-[100%]"
        />

        <Accordion type="single" collapsible className="w-full my-7">
          {project_surmmry.map((item, idx) => {
            return (
              <AccordionItem
                value={`${idx}`}
                key={`${idx}-acodian`}
                className="outline px-4"
              >
                <AccordionTrigger className="font-bold">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>{item.contents}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <EditorProvider editor={editor}>
          <SimpleEditorContents
            value={HtmlContentNormalizer.setImgUrl(
              project_contents[0].contents
            )}
          />
        </EditorProvider>
      </div>
    </section>
  );
};

export default ProjectDetail;
