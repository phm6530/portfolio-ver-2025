import { ContenstSafeGuard } from "@/utils/badword-filter";
import { z } from "zod";

// 모든 가능한 필드를 포함하는 인터페이스 정의
export interface CommentFormSchema {
  comment: string;
  guest?: string;
  password?: string;
  userIcon: string;
  parent_id?: number;
}
export const dynamicSchema = (existParent: boolean, session: boolean) => {
  const base = {
    comment: z
      .string()
      .min(2, { message: "내용은 2글자 이상 기재해주세요" })
      .max(1000, { message: "1000자 이하로 기재해주세요" })
      .refine((val) => !ContenstSafeGuard.hasAnyMaliciousContent(val), {
        message: "내용에 비속어나 보안상 위험한 코드가 포함되어 있습니다.",
      }),
  };

  const guestFields = {
    guest: z
      .string()
      .min(2, { message: "닉네임은 2글자 이상으로 설정해주세요" })
      .refine((val) => !ContenstSafeGuard.hasAnyMaliciousContent(val), {
        message: "내용에 비속어나 보안상 위험한 코드가 포함되어 있습니다.",
      }),
    password: z
      .string()
      .min(4, { message: "비밀번호는 4자리 이상 설정해주세요" })
      .refine(
        (val) =>
          !ContenstSafeGuard.hasScriptInText(val) &&
          !ContenstSafeGuard.hasSqlInjection(val),
        {
          message: "비밀번호에 사용할 수 없는 문자가 포함되어 있습니다.",
        }
      ),
    userIcon: z.string().optional(),
  };

  const parentField = {
    parent_id: z.number().min(1, { message: "요청이 잘못되었습니다" }),
  };

  return z.object({
    ...(session ? {} : guestFields),
    ...(existParent ? parentField : {}),
    ...base,
  });
};
// 타입 추출을 위한 헬퍼 타입
export type CommentFormValues = z.infer<ReturnType<typeof dynamicSchema>>;
