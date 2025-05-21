import { Controller } from "react-hook-form";
import BoardCommentInput from "./BoardCommentInput";
import { useForm } from "react-hook-form";

import { randomCrector } from "@/features/Board/BoardCrector/randomCrector";
import { useCallback, useEffect } from "react";
import useStore from "@/store/zustandStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CommentFormSchema, dynamicSchema } from "../schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import useThrottling from "@/hooks/useThrottling";
import { cn } from "@/lib/utils";
import { PenBoxIcon } from "lucide-react";
import ErrorBubble from "@/components/error/ErrorBubble";
import { queryClient } from "@/react-query/queryClient";

type CommentFormValues = z.infer<ReturnType<typeof dynamicSchema>>;

export default function BoardCommentForm({
  parent_id,
}: {
  parent_id?: null | number;
}) {
  const login = useStore((state) => state.userAuth.login);
  const { commentsViewOff } = useStore(); // Zustand로 공유
  const { throttle } = useThrottling();
  const queryClient = useQueryClient();

  const defaultValues = useCallback((parent_id?: number | null) => {
    return {
      guest: "",
      userIcon: "",
      comment: "",
      password: "",
      ...(parent_id && { parent_id }),
    };
  }, []);

  const form = useForm<CommentFormSchema>({
    defaultValues: defaultValues(parent_id),
    resolver: zodResolver(dynamicSchema(!!parent_id, !!login)),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: CommentFormValues) => {
      return requestHandler(async () => {
        return await axiosApi.post(
          `/guestboard`,
          parent_id ? { ...data, parent_id } : data
        );
      });
    },
    onSuccess: () => {
      toast.success("등록 되었습니다.");
      form.reset(defaultValues(parent_id));
      if (!!parent_id) commentsViewOff();
      queryClient.invalidateQueries({
        queryKey: ["GUESTBOARD"],
      });
    },
  });

  const onSubmitHandlr = (data: CommentFormValues) => {
    throttle(async () => mutate(data), 1500);
  };

  useEffect(() => {
    form.reset({
      ...defaultValues(),
      userIcon: randomCrector(login),
      ...(parent_id && { parent_id }),
    });
  }, [parent_id, login]);

  const errors = Object.values(form.formState.errors).map((e) => e.message);

  return (
    <>
      <form
        className={cn(
          "w-full flex flex-col items-start relative",
          !!parent_id && "animate-wiggle"
        )}
        method="POST"
        onSubmit={form.handleSubmit(onSubmitHandlr)}
      >
        {errors.length > 0 && <ErrorBubble>{errors[0]}</ErrorBubble>}
        <div className="flex flex-col md:flex-row md:lex-wrap gap-3 w-full mt-5">
          {!login && (
            <>
              <Controller
                name="guest"
                control={form.control}
                render={({ field }) => (
                  <BoardCommentInput
                    {...field}
                    label="닉네임"
                    isAuth={login}
                    placeholder={"닉네임"}
                    type={"text"}
                    error={form.formState.errors.guest}
                  />
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <BoardCommentInput
                    {...field}
                    label="비밀번호"
                    type={"password"}
                    placeholder={"비밀번호"}
                    error={form.formState.errors.password}
                  />
                )}
              />
            </>
          )}
        </div>

        <div className="w-full flex mt-2 gap-3 mb-13 items-stretch">
          <Controller
            name="comment"
            control={form.control}
            render={({ field }) => (
              <BoardCommentInput
                {...field}
                label="댓글"
                type={"textarea"}
                placeholder={"남기실 댓글 내용을 입력해주세요!"}
                sum
                error={form.formState.errors.comment}
              />
            )}
          />
          <button className="relative w-[100px] inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative w-full h-full gap-2 flex justify-center items-center  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <PenBoxIcon size={17} />
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
