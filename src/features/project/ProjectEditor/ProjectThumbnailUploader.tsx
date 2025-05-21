import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { IMG_URL } from "@/constants/apiUrl";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useUploader from "@/hooks/useUploader";

interface ProjectThumbnailUploaderProps {
  value: string;
  projectKey: string;
}

const ProjectThumbnailUploader: React.FC<ProjectThumbnailUploaderProps> = ({
  projectKey,
}) => {
  const { watch, setValue, trigger, formState } =
    useFormContext<z.infer<typeof projectSchema>>();

  const ref = useRef<HTMLInputElement>(null);
  const { handler } = useUploader(projectKey);

  const fileFiler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await handler(e);
    setValue("thumbnail", url, { shouldValidate: true });
  };

  return (
    <>
      <FormItem
        className={cn(
          "w-full p-5 border border-foreground/20 rounded-lg",
          !!formState.errors.thumbnail?.message && "border-destructive"
        )}
      >
        <FormLabel>메인 이미지</FormLabel>
        <input
          type="file"
          className="hidden"
          id="input-file"
          onChange={(e) => fileFiler(e)}
          ref={ref}
        />
        <div
          className={cn(
            "bg-foreground/5 min-h-[200px] rounded-xl hover:border-indigo-400 overflow-hidden cursor-pointer flex items-center justify-center aspect-[16/5]"
          )}
          onClick={() => ref.current?.click()}
        >
          {watch("thumbnail") ? (
            <img src={`${IMG_URL}/${watch("thumbnail")}`} alt="" />
          ) : (
            <span className="opacity-60">Img File을 Drag & Drop 해주세요</span>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <Button
            variant={"ghost"}
            type="button"
            className="border border-foreground/50 text-xs"
            onClick={() => {
              setValue("thumbnail", "");
              trigger("thumbnail");
            }}
          >
            <Delete /> 이미지 삭제
          </Button>
        </div>
        {!!formState.errors.thumbnail?.message && (
          <FormMessage>{formState.errors.thumbnail?.message}</FormMessage>
        )}
      </FormItem>
    </>
  );
};

export default ProjectThumbnailUploader;
