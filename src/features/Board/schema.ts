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
      .max(1000, { message: "1000자 이하로 기재해주세요" }),
  };

  const guestFields = {
    guest: z
      .string()
      .min(2, { message: "닉네임은 2글자 이상으로 설정해주세요" }),
    password: z
      .string()
      .min(4, { message: "비밀번호는 4자리 이상 설정해주세요" }),
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
