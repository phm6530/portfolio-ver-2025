import styled from "styled-components";
import * as Yup from "yup";

import { forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// icon
import { TiDelete } from "react-icons/ti";
import { FaCircleCheck } from "react-icons/fa6";

import CommentDelete from "@/features/Board/BoardCommentControl/CommentDelete";
import useCommentDelete from "@/features/Board/hooks/useCommentDelete";
import usePopupHook from "@/hooks/usePopupHook";

import { type BoardCommentItemProps } from "@/type/BoardTypes";
import { userRole } from "@/type/CommonTypes";
import useStore from "@/store/zustandStore";
import { cn } from "@/lib/utils";
import {
  ArrowBigDown,
  BadgeCheck,
  Check,
  CheckCircle2,
  CornerDownRight,
  Shield,
} from "lucide-react";
import { CommentItemModel } from "../BoardCommentList/BoardCommentList";
import BoardCommentForm from "../BoardCommentForm/BoardCommentForm";
import { DateUtils } from "@/utils/dateUtil";
import { useMutation } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import axios from "axios";
import { axiosApi } from "@/config/axios.config";
import { toast } from "react-toastify";
import SupabasePool from "@/lib/supabaseClient";

interface BoardCommentProps {
  item: CommentItemModel;
  deps: number;
  rootId?: number;
}

const BoardComment = forwardRef<HTMLDivElement, BoardCommentProps>(
  ({ item, deps, rootId }, ref) => {
    const login = useStore((state) => state.userAuth.login);
    const { commentsViewId, toggleFormView } = useStore(); // Zustand로 공유
    const pool = SupabasePool.getInstance();

    const { id, comment, author, children, created_at } = item;

    const schema = Yup.object({
      password: login
        ? Yup.string().notRequired()
        : Yup.string().required("비밀번호를 입력해주세요."),
    });

    const { formState, reset } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        password: "",
      },
    });

    const { mutate } = useMutation({
      mutationFn: async () => {
        return await requestHandler(async () => {
          const { data: session } = await pool.auth.getSession();
          if (!session) throw new Error("권한이 없습니다.");

          const { count, error, data } = await pool
            .from("guest_board")
            .delete()
            .eq("id", id)
            .select(); // 💡 count 받아오기 위해 select 사용

          if (error) {
            throw new Error(`삭제 실패: ${error.message}`);
          }

          if (!data || data.length === 0) {
            throw new Error("삭제되지 않았습니다.");
          }
          return { data: true }; // requestHandler 맞춤
        });
      },
      onSuccess: () => {
        toast.success("삭제 되었습니다");
        reset();
      },
    });

    const onDeleteHnadler = () => {
      if (!confirm("삭제하시겠습니까?")) return;
      mutate();
    };

    return (
      <>
        {/* <PopupComponent type="confirm" event={() => deleteConfirm()} /> */}
        <div
          ref={ref}
          className={cn(
            "  relative justify-start cursor-pointer w-full",
            author.role === userRole.Admin ? "" : "",
            deps > 1 && "mt-2"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "size-10 border-5 border-transparent  dark:bg-indigo-300/20    shadow-xl rounded-full overflow-hidden",
                author.role === userRole.SUPER && "border-indigo-300/10"
              )}
            >
              <div className="relative">
                <img
                  src={
                    author.role === userRole.SUPER
                      ? "/img/me.jpg"
                      : `/img/board/${author.profile_img}`
                  }
                  alt="user_icon"
                  className="w-full rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("text-sm font-bold  flex gap-2 items-center")}>
                {author.nickname}{" "}
                {author.role === userRole.SUPER && (
                  <BadgeCheck className="text-teal-400" size={19} />
                )}
              </div>

              <span className="text-xs opacity-50 ">
                {DateUtils.fromNow(created_at)}
              </span>

              {!!login && (
                <div className="replyDelete" onClick={onDeleteHnadler}>
                  <TiDelete size={15} className="ml-auto opacity-50" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div
              className={cn(
                "p-4 rounded-2xl relative border shadow-lg",
                author.role === userRole.SUPER ? "bg-[#fedf7c]" : "bg-[#caeaf9]"
              )}
              style={{
                borderColor:
                  author.role === userRole.SUPER ? "#e6bb49" : "#a9cff1",
              }}
            >
              <div
                className={cn(
                  "absolute w-0 h-0 -top-[14px] left-[17px] border-y-[5px] border-y-transparent border-l-[10px] border-r-[10px] border-r-transparent rotate-90",
                  author.role === userRole.SUPER
                    ? "border-l-[#fedf7c]"
                    : "border-l-[#caeaf9]"
                )}
                style={{ transform: "rotate(180deg)" }}
              />

              <div className="text-[13px] md:text-sm text-zinc-800 whitespace-pre-wrap ">
                {comment}
              </div>
            </div>
            <div className="text-xs mt-3" onClick={() => toggleFormView(id)}>
              댓글쓰기
              {deps === 1 && children.length > 0 && (
                <span className="text-indigo-300">( {children.length} )</span>
              )}
            </div>

            {commentsViewId === id && <BoardCommentForm parent_id={rootId} />}
          </div>

          {formState.errors.password && (
            <p>{formState.errors.password.message}</p>
          )}
        </div>{" "}
        {children?.map((e) => (
          <div className="ml-4 flex gap-3">
            <CornerDownRight className="opacity-40 mt-5" size={16} />
            <BoardComment item={e} deps={deps + 1} rootId={id} />
          </div>
        ))}
      </>
    );
  }
);

export default BoardComment;
