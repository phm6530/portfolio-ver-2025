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
import { useMutation } from "@tanstack/react-query";
import SupabasePool from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProjectThumbnailUploader from "./ProjectThumbnailUploader";
import { getPlainText } from "@/utils/plain-text";
import { DateUtils } from "@/utils/dateUtil";

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
  surmmry: Array<{ title: string; description: string }>;
  thumbnail: string;
  contents: string;
  projectRoles: projectRoles[];
}

export default function ProjectForm() {
  // 이미지키
  const imgKey = useMemo(() => uuidv4(), []);

  const nav = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (body: z.infer<typeof projectSchema>) => {
      try {
        const pool = SupabasePool.getInstance();

        // meta
        const { data: metaData, error: metaError } = await pool
          .from("project_meta")
          .insert([
            {
              title: body.title,
              company: body.company,
              description: getPlainText(body.contents, 200),
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
            contents: item.description,
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
      } catch (err) {
        throw new Error("등록 실패 하였습니다.");
      }
    },
    onSuccess: () => {
      toast.success("프로젝트가 등록 되었습니다.");
      nav("/project");
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: {
      title: "",
      company: "",
      contents: "",
      useStack: [],
      surmmry: [
        {
          title: "",
          description: "",
        },
      ],
      workRange: {
        start: null,
        end: null,
      },
    },
    resolver: zodResolver(projectSchema),
  });

  console.log(form.watch());
  console.log(form.formState.errors);

  const { editor } = useSimpleEditor({
    placeholder: "프로젝트 내용을 입력해주세요 .",
    editable: true,
  });

  const onSubmitHandler = (e: z.infer<typeof projectSchema>) => {
    console.log("submit::", e);

    mutate(e);
  };

  return (
    <section className="max-w-[800px] mx-auto">
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
              className="p-2"
              placeholder="프로젝트 제목을 입력해주세요"
              label="프로젝트 제목"
              errorField
            />

            {/* Title */}
            <InputField
              name="company"
              className="p-2"
              placeholder="프로젝트 제목을 입력해주세요"
              label="프로젝트 기관"
              errorField
            />
          </div>

          <ProjectThumbnailUploader value="thumbnail" projectKey={imgKey} />

          {/* Title */}
          <InputField
            name="url"
            className="p-2 w-full"
            placeholder="공개 된 url을 입력해주세요"
            label="URL"
            errorField
          />

          {/* Pop Over */}
          <FormItem>
            <FormLabel>작업기간</FormLabel>
            <DatePickerWithRange />
          </FormItem>

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
                        <SimpleEditorContents onChange={field.onChange} />
                      </EditorProvider>
                    </FormControl>{" "}
                    <FormMessage />
                  </FormItem>{" "}
                </div>
              );
            }}
          />

          <Button className="" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
