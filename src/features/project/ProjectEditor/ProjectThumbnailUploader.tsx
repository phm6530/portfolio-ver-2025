import styled from "styled-components";
import InputErrorMessage from "@/component/error/InputErrorMessage";
import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { IMG_URL } from "@/constants/apiUrl";
import { Button } from "@/components/ui/button";
import { Delete, ReceiptEuroIcon, Recycle, Upload } from "lucide-react";

const UPloadFileName = styled.div`
  font-size: 12px;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;

  margin-left: 1rem;
`;

const WrapperFlex = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

interface ProjectThumbnailUploaderProps {
  value: string;
  projectKey: string;
}

const ProjectThumbnailUploader: React.FC<ProjectThumbnailUploaderProps> = ({
  projectKey,
}) => {
  const { watch, setValue, trigger } =
    useFormContext<z.infer<typeof projectSchema>>();

  const ref = useRef<HTMLInputElement>(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await requestHandler(async () => {
        const response = await axiosApi.post(`/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response;
      });
    },
  });

  const fileFiler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const ImgFile = e.target.files![0];

    if (!ImgFile) return; //없으면 리턴 해버림
    const imgSize = ImgFile.size / 1024 / 1024;

    if (parseInt(imgSize.toFixed(2)) > 5) {
      alert(`${imgSize} 는 너무 크네요.. 5mb이하만 가능합니다. `);
      return;
    }
    if (!ImgFile.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    const newFileName = ImgFile.name.replace(/[^\w.-]/g, "_");

    formData.append("file", ImgFile, newFileName); // 'img' 필드에 파일 추가
    formData.append("imgKey", projectKey);

    //서버요청
    const test = await mutateAsync(formData);

    setValue("thumbnail", test.result.url, { shouldValidate: true });
    // shouldValidate = 설정된 값이 true일때 유효성 검사를 진행함.
    // 값이 변경될때도 반영됨
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <input
        type="file"
        className="hidden"
        id="input-file"
        onChange={(e) => fileFiler(e)}
        ref={ref}
      />
      <div
        className={cn(
          " border min-h-[200px] border-dotted rounded-xl hover:border-indigo-400 overflow-hidden cursor-pointer flex items-center justify-center aspect-[16/9]"
        )}
        onClick={() => ref.current?.click()}
      >
        {watch("thumbnail") ? (
          <img src={`${IMG_URL}/${watch("thumbnail")}`} alt="" />
        ) : (
          <span className="opacity-60">Img File을 Drag & Drop 해주세요</span>
        )}
      </div>
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
  );
};

export default ProjectThumbnailUploader;
