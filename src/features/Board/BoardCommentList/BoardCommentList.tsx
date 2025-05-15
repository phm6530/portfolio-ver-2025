import React, { useEffect, useRef, useState } from "react";
import BoardComment from "@/features/Board/BoardComment/BoardComment";

import FadeInAnimation from "@/component/animations/FadeInAnimation";
import useCommentInfinity from "@/features/Board/hooks/useCommentInfinity";
import { SpinnerLoading } from "@/component/loading/SpinnerLoading";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import BoardCommentStatus from "../BoardCommentStatus/BoardCommentStatus";
import { DateUtils } from "@/utils/dateUtil";
import SupabasePool from "@/lib/supabaseClient";

type Author =
  | {
      role: "admin" | "super";
      admin_email: string;
      nickname: string;
      guest_id?: undefined;
      profile_img: string | null;
    }
  | {
      role: "guest";
      guest_id: number;
      nickname: string;
      admin_email?: undefined;
      profile_img: string | null;
    };

export type CommentItemModel = {
  id: number;
  comment: string;
  parent_id: number | null;
  created_at: string;
  author: Author;
  post_id?: number;
  children: CommentItemModel[];
};

const BoardCommentList = (): JSX.Element => {
  const { data, isLoading } = useQuery<{ result: CommentItemModel[] }>({
    queryKey: ["GUESTBOARD"],
    queryFn: async () => {
      return requestHandler(async () => {
        return await axiosApi.get("/guestboard");
      });
    },
  });

  let prevMonth = "";
  const todayCOmment = (data: CommentItemModel[]) => {
    let cnt = 0;
    for (const item of data) {
      if (DateUtils.isToday(item.created_at)) {
        cnt++;
      } else {
        break;
      }
    }
    return cnt;
  };

  return (
    <>
      {/* 오늘 댓글 + 전체댓글  */}
      {isLoading ? (
        <section className="flex flex-col gap-5">
          {[1, 2, 3, 4].map((e) => (
            <div>
              <div className="mt-5 flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <div className="size-10 bg-foreground/10 rounded-full animate-pulse" />
                  <div className="h-4 bg-foreground/10 w-[100px] rounded-full animate-pulse" />{" "}
                  <div className="h-4 bg-foreground/10 w-[50px] rounded-full animate-pulse" />
                </div>
                <div className="h-4 bg-foreground/10 w-2/3 rounded-full animate-pulse" />
                <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </section>
      ) : (
        data && (
          <BoardCommentStatus
            todayReply={todayCOmment(data?.result)}
            total={data.result.length}
          />
        )
      )}
      <section className="flex flex-col gap-5 ">
        {/* 뿌리기 */}
        {data?.result.map((item, idx) => {
          const currentMonth = format(item.created_at, "yyyy. MM");
          const isNewMonth = currentMonth !== prevMonth;
          prevMonth = currentMonth;
          return (
            <React.Fragment key={`guestbook-${idx}`}>
              <div>
                {isNewMonth && (
                  <div className="flex gap-4 py-2 items-center">
                    <span className="text-xs text-muted-foreground ">
                      {currentMonth}
                    </span>
                    <div className="border-b border-input flex-1" />
                  </div>
                )}

                <FadeInAnimation>
                  <BoardComment item={item} deps={1} rootId={item.id} />
                </FadeInAnimation>
              </div>
            </React.Fragment>
          );
        })}
      </section>{" "}
    </>
  );
};

export default BoardCommentList;
