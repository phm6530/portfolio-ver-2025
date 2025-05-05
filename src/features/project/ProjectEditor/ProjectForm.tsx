import { useForm } from "react-hook-form";
import { projectRoles } from "@/type/ProjectTypes";
import {
  EditorProvider,
  SimpleEditorContents,
  SimpleToolTip,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputField from "@/components/shared/inputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema/project-schema";
import ProjectStackHandler from "./project-statckhandler";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { DatePickerWithRange } from "./project-date-picker";
import ProjectSummry from "./project-summry";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SupabasePool from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProjectThumbnailUploader from "./ProjectThumbnailUploader";
import { getPlainText } from "@/utils/plain-text";
import { DateUtils } from "@/utils/dateUtil";
import { requestHandler } from "@/utils/apiUtils";
import { DetailProps } from "../ProjectDetail";
import TextareaFormField from "@/components/shared/textareaField";

export interface ProjectDetailProps {
  id: string;
  title: string;
  useStack: number[];
  company: string;
  projectUrl: string;
  description: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  surmmry: Array<{ id?: number; title: string; contents: string }>;
  thumbnail: string;
  contents: string;
  projectRoles: projectRoles[];
  img_key: string;
}

export default function ProjectForm() {
  const [search] = useSearchParams();
  const projectNum = search.get("edit");
  const nav = useNavigate();
  const [imgKey, setImgkey] = useState<string>(useMemo(() => uuidv4(), []));
  const queryclient = useQueryClient();

  // Get
  const { data } = useQuery({
    queryKey: [`PROJECT_DETAIL:${projectNum}`],
    queryFn: async () => {
      return await requestHandler(async () => {
        const response = await SupabasePool.getInstance()
          .from("project_meta")
          .select(
            `
            *,
            project_contents(*),
            project_meta_stack(
              project_stack(id, stack, type)
            ),
            project_surmmry(id, title, contents)
          `
          )
          .eq("id", projectNum);

        if (response.error || !response.data || response.data.length === 0) {
          throw new Error(
            `요청 실패 : ${response.error?.message ?? "데이터 없음"}`
          );
        }

        return response;
      });
    },
    enabled: !!projectNum,
    staleTime: Infinity,
  });

  // 수정 or insert
  const { mutate } = useMutation({
    mutationFn: async (body: z.infer<typeof projectSchema>) => {
      try {
        const pool = SupabasePool.getInstance();
        const isEdit = !!projectNum;

        if (isEdit) {
          const { error: updateError } = await pool
            .from("project_meta")
            .update({
              title: body.title,
              company: body.company,
              description: body.description,
              start_date: DateUtils.dateFormatKR(
                body.workRange.start!,
                "YYYY. MM. DD"
              ),
              end_date: DateUtils.dateFormatKR(
                body.workRange.end!,
                "YYYY. MM. DD"
              ),
              project_url: body.url,
              thumbnail: body.thumbnail,
            })
            .eq("id", projectNum);

          if (updateError) throw updateError;

          // ✅ 내용 수정
          const { error: contentError } = await pool
            .from("project_contents")
            .update({
              contents: body.contents,
            })
            .eq("project_id", projectNum);

          if (contentError) throw contentError;

          // ✅ 요약 삭제 후 재삽입
          await pool
            .from("project_surmmry")
            .delete()
            .eq("project_id", projectNum);

          const summaryValues = body.surmmry.map((item) => ({
            project_id: projectNum,
            title: item.title,
            contents: item.contents,
          }));
          const { error: summaryError } = await pool
            .from("project_surmmry")
            .insert(summaryValues);

          if (summaryError) throw summaryError;

          // ✅ 스택도 삭제 후 재삽입
          await pool
            .from("project_meta_stack")
            .delete()
            .eq("project_id", projectNum);
          const stackValues = body.useStack.map((item) => ({
            project_id: projectNum,
            stack_id: item,
          }));
          const { error: stackError } = await pool
            .from("project_meta_stack")
            .insert(stackValues);

          if (stackError) throw stackError;
        } else {
          // meta
          const { data: metaData, error: metaError } = await pool
            .from("project_meta")
            .insert([
              {
                title: body.title,
                company: body.company,
                description: body.description,
                start_date: DateUtils.dateFormatKR(
                  body.workRange.start!,
                  "YYYY. MM. DD"
                ),
                end_date: DateUtils.dateFormatKR(
                  body.workRange.end!,
                  "YYYY. MM. DD"
                ),
                project_url: body.url,
                thumbnail: body.thumbnail,
                img_key: imgKey,
              },
            ])
            .select("id")
            .single();

          if (metaError) {
            console.error("project_meta insert 실패:", metaError.message);
            throw metaError;
          }

          // content
          const { error: contentError } = await pool
            .from("project_contents")
            .insert([
              {
                project_id: metaData.id,
                contents: body.contents,
              },
            ]);

          if (contentError) {
            console.error("project_content insert 실패:", contentError);
            throw contentError;
          }

          const surmmryValues = body.surmmry.map((item) => {
            return {
              project_id: metaData.id,
              title: item.title,
              contents: item.contents,
            };
          });

          const { error: surmrryError } = await pool
            .from("project_surmmry")
            .insert(surmmryValues);

          if (surmrryError) {
            console.error(
              "summry insert 실패:",
              surmrryError.message ?? surmrryError
            );
            throw surmrryError;
          }

          // stack은 다 대 다임 statck은 id만 전달함

          const stackValues = body.useStack.map((item) => {
            return {
              project_id: metaData.id,
              stack_id: item,
            };
          });
          const { error: stackError } = await pool
            .from("project_meta_stack")
            .insert(stackValues);

          if (stackError) {
            console.error("project_stack 실패:", stackError.message);
            throw stackError;
          }
        }
      } catch (err) {
        throw new Error("등록 실패 하였습니다.");
      }
    },
    onSuccess: async () => {
      toast.success("프로젝트가 등록 되었습니다.");
      nav("/project");
      form.reset();
      await queryclient.invalidateQueries({
        queryKey: ["project-list"],
      });
    },
  });

  // form
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      title: "",
      company: "",
      contents: "",
      useStack: [],
      description: "",
      surmmry: [
        {
          title: "",
          contents: "",
        },
      ],
      workRange: {
        start: null,
        end: null,
      },
    },
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (!!projectNum && data) {
      const result = data[0] as DetailProps;

      // Stack
      const stacks = result.project_meta_stack.map((e) => e.project_stack.id);

      // Summry
      const surmmrys = result.project_surmmry.map((e) => {
        return {
          id: e.id,
          title: e.title,
          contents: e.contents,
        };
      });

      form.reset({
        title: result.title,
        company: result.company,
        thumbnail: result.thumbnail,
        url: result.project_url,
        useStack: stacks,
        surmmry: surmmrys,
        description: result.description,
        workRange: {
          start: new Date(result.start_date),
          end: new Date(result.end_date),
        },
        contents: result.project_contents[0].contents,
      });

      // Imgkey
      setImgkey(result.img_key);
    }
  }, [data]);

  const { editor } = useSimpleEditor({
    placeholder: "프로젝트 내용을 입력해주세요 .",
    editable: true,
  });

  const onSubmitHandler = (e: z.infer<typeof projectSchema>) => {
    mutate(e);
  };

  return (
    <section className="max-w-[800px] mx-auto mb-20">
      <h1 className="border-b border-foreground/40 text-2xl pb-3 mb-10">
        Project Created
      </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-10 items-start"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          {/* Title */}
          <div className="grid w-full gap-2 grid-cols-2">
            <InputField
              name="title"
              className="p-2 "
              placeholder="프로젝트 제목을 입력해주세요"
              label="프로젝트 제목"
              errorField
            />

            {/* Title */}
            <InputField
              name="company"
              className="p-2 "
              placeholder="프로젝트 제목을 입력해주세요"
              label="프로젝트 기관"
              errorField
            />
          </div>

          <TextareaFormField
            label="설명"
            name="description"
            className="w-full"
            placeholder="내용을 입력해주세요"
          />

          {/* Title */}
          <div className="w-full grid grid-cols-2 gap-2">
            <InputField
              name="url"
              className="p-2 w-[100%] flex-1 border border-foreground/50!"
              placeholder="공개 된 url을 입력해주세요"
              label="URL"
              errorField
            />

            {/* Pop Over */}
            <FormItem>
              <FormLabel>작업기간</FormLabel>
              <DatePickerWithRange />
            </FormItem>
          </div>

          <ProjectThumbnailUploader value="thumbnail" projectKey={imgKey} />

          {/* Stack */}
          <ProjectStackHandler />

          {/* Summry */}
          <FormItem className="w-full">
            <FormLabel>작업 Summry</FormLabel>

            <ProjectSummry />
          </FormItem>

          {/* editor */}

          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => {
              return (
                <div
                  className={cn(
                    "w-full border border-border p-5",
                    !!form.formState.errors.contents && "border-destructive"
                  )}
                >
                  <FormItem>
                    <FormControl>
                      <EditorProvider editor={editor}>
                        <SimpleToolTip />
                        <SimpleEditorContents
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </EditorProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            }}
          />

          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
