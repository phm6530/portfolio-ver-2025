import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useUploader(projectKey: string) {
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

  const handler = async (e: React.ChangeEvent<HTMLInputElement> | File) => {
    let ImgFile: File;

    if (e instanceof File) {
      ImgFile = e;
    } else if (e.target && e.target.files && e.target.files.length > 0) {
      ImgFile = e.target.files[0];
    } else {
      toast.error("파일이 존재하지 않습니다.");
      return;
    }

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
    toast.success("업로드 되었습니다.");
    console.log(test.result.url);

    return test.result.url;
  };

  return { handler };
}
