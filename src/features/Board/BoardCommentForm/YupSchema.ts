import { z } from "zod";
import { findForBadword } from "@/utils/wordingFilters";

const zodSchema = (login: boolean) =>
  z.object({
    userIcon: z.string().min(1, "필수항목 입니다."),
    userName: z
      .string()
      .min(2, "필수항목 입니다")
      .max(20, "최대 20글자 이하로 적어주세요"),
    contents: z
      .string()
      .min(4, "필수항목 입니다")
      .refine((value) => findForBadword(value), {
        message: "비속어는 입력 불가합니다...",
      }),
    password: login
      ? z.string().optional()
      : z
          .string({
            required_error: "비밀번호를 입력해주세요.",
          })
          .min(4, "최소 4글자 이상 적어주세요.."),
  });

export { zodSchema };
