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
  const { data: infinityData, isLoading, isError } = useCommentInfinity();

  const { data } = useQuery<{ result: CommentItemModel[] }>({
    queryKey: ["GUESTBOARD"],
    queryFn: async () => {
      return requestHandler(async () => {
        return await axiosApi.get("/guestboard");
      });
    },
  });

  const [selectIdx, setSelectIdx] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // 중복제거
  const dateSet = new Set();

  const isFirstDate = (date: string) => {
    if (!dateSet.has(date)) {
      dateSet.add(date);
      return true;
    }
    return false;
  };

  // useEffect(() => {
  //   const targetItem = ref.current;
  //   if (!hasNextPage || !targetItem) return;

  //   const callback = async (entry: IntersectionObserverEntry[]) => {
  //     if (entry[0].isIntersecting) {
  //       fetchNextPage();
  //     }
  //   };

  //   const io = new IntersectionObserver(callback, {
  //     threshold: 0.5,
  //   });
  //   if (targetItem) {
  //     io.observe(targetItem);
  //   }
  //   return () => io.unobserve(targetItem);
  // }, [ref, fetchNextPage, infinityData, hasNextPage]);

  if (isLoading) {
    return (
      <>
        <SpinnerLoading />
      </>
    );
  }

  if (isError) {
    return <>Error</>;
  }

  let prevMonth = "";

  return (
    <>
      {/* 오늘 댓글 + 전체댓글  */}
      {infinityData && (
        <BoardCommentStatus
          todayReply={infinityData.pages[0].todayReply}
          total={infinityData.pages[0].counter}
        />
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
