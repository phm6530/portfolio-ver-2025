import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  endDate,
  projectRoles,
  skillType,
  startDate,
} from "@/type/ProjectTypes";
import {
  EditorProvider,
  SimpleEditorContents,
  SimpleToolTip,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { Form } from "@/components/ui/form";
import InputField from "@/components/shared/inputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema/project-schema";
import ProjectStackHandler from "./project-statckhandler";

export interface ProjectDetailProps {
  id: string;
  title: string;
  skill: string[];
  company: string;
  projectUrl: string;
  startDate: startDate;
  endDate: endDate;
  thumbnail: string;
  description: string;
  projectDescription: string;
  projectRoles: projectRoles[];
}

export default function ProjectForm() {
  const form = useForm({
    resolver: zodResolver(projectSchema),
  });
  const { editor } = useSimpleEditor({ editable: true });

  return (
    <section className="flex flex-col gap-5">
      <Form {...form}>
        <InputField
          name="title"
          placeholder="프로젝트 제목을 입력해주세요"
          label="프로젝트 제목"
        />
        <InputField
          name="title"
          placeholder="프로젝트 제목을 입력해주세요"
          label="프로젝트 기관"
        />
        <ProjectStackHandler />
        <EditorProvider editor={editor}>
          <SimpleToolTip />
          <SimpleEditorContents />
        </EditorProvider>{" "}
      </Form>
    </section>
  );
}
