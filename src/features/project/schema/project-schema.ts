import { z } from "zod";

export const projectSchema = z.object({
  company: z.string().min(1, { message: "필수 항목" }),
  url: z.string().nullable(),
  skill: z
    .array(z.string())
    .min(1, { message: "기술을 하나 이상 선택하세요." }),
});
