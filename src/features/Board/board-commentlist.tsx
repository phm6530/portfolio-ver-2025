import React, { useLayoutEffect, useRef } from "react";
import BoardComment from "@/features/Board/BoardComment/BoardComment";
import FadeInAnimation from "@/components/animations/FadeInAnimation";
import { format } from "date-fns";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosApi } from "@/config/axios.config";
import BoardCommentStatus from "./BoardCommentStatus/BoardCommentStatus";
import { DateUtils } from "@/utils/dateUtil";
import LoadingSpiner from "@/components/ui/loading-spiner";

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
  author_type: "guest" | "admin";
};

const BoardCommentList = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, isFetching, isSuccess, isPending, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["GUESTBOARD"],
      queryFn: async ({ pageParam }) => {
        let endPoint = "/guestboard";
        const curCursor = pageParam === 0 ? undefined : pageParam;
        if (curCursor) {
          endPoint += `?cursor=${curCursor}`;
        }

        const response = await axiosApi.get(endPoint);
        console.log(response);
        return response.data.result;
      },
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        if (lastPage.isNextPage) {
          return lastPage.list.at(-1)?.id;
        }
      },
      initialPageParam: 0,
    });

  const todayCOmment = (data: CommentItemModel[]) => {
    let cnt = 0;
    for (const item of data) {
      if (DateUtils.isToday(item.created_at)) {
        console.log(DateUtils.parseKoreanDate(item.created_at));

        cnt++;
      } else {
        break;
      }
    }
    return cnt;
  };

  const resultList = data?.pages.flatMap((e) => e.list) ?? [];

  useLayoutEffect(() => {
    if (!ref.current || !isSuccess) return;
    const currentRef = ref.current;
    const cb = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    };
    const io = new IntersectionObserver(cb, { threshold: 0.1 });
    io.observe(ref.current);

    return () => {
      io.unobserve(currentRef);
      io.disconnect();
    };
  }, [ref, isSuccess, fetchNextPage]);

  let prevMonth = "";

  return (
    <>
      {/* 오늘 댓글 + 전체댓글  */}
      {isPending ? (
        <section className="flex flex-col gap-5">
          {[1, 2, 3, 4].map((_, idx) => (
            <React.Fragment key={`skeleton:${idx}`}>
              <div data-testid="loading" className="mt-5 flex flex-col gap-3">
                <div className="flex gap-5 items-center">
                  <div className="size-10 bg-foreground/10 rounded-full animate-pulse" />
                  <div className="h-4 bg-foreground/10 w-[100px] rounded-full animate-pulse" />
                  <div className="h-4 bg-foreground/10 w-[50px] rounded-full animate-pulse" />
                </div>
                <div className="h-4 bg-foreground/10 w-2/3 rounded-full animate-pulse" />
                <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
              </div>
            </React.Fragment>
          ))}
        </section>
      ) : (
        data && (
          <BoardCommentStatus
            todayReply={todayCOmment(resultList)}
            total={resultList.length}
          />
        )
      )}
      <section className="flex flex-col gap-5 " data-testid="list-wrapper">
        {/* 뿌리기 */}
        {resultList.map((item, idx) => {
          const currentMonth = format(item.created_at, "yyyy. MM");
          const isNewMonth = currentMonth !== prevMonth;
          prevMonth = currentMonth;

          return (
            <React.Fragment key={`guestbook-${idx}`}>
              <div className="pb-5 ">
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

        {isFetching && (
          <div className="relative w-full h-[50px]">
            <LoadingSpiner />
          </div>
        )}

        {hasNextPage && <div className="h-[50px] w-full" ref={ref}></div>}
      </section>
    </>
  );
};

export default BoardCommentList;
