import { useInfiniteQuery } from "@tanstack/react-query";
import NonData from "@/component/NonData";
import Motion from "@/component/animations/Motion";
import { SpinnerLoading } from "@/component/loading/SpinnerLoading";
import { axiosApi } from "@/config/axios.config";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { requestHandler } from "@/utils/apiUtils";
import styled from "styled-components";
import BlogContentsItem from "../BlogContents/BlogContentsItem";
import SearchField from "@/components/shared/search-input-field";

export enum POST_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
  PRIVATE = "private",
}

export type PostItemModel = {
  post_id: number;
  post_title: string;
  post_description: string;
  created_at: string;
  update_at: string;
  author_id: number;
  thumbnail_url: string;
  sub_group_name: string;
  like_cnt: number;
  status: POST_STATUS;
  comment_count: number;
};

const BlogList = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const item = searchParams.get("item");
  const search = searchParams.get("keyword");

  const { data, fetchNextPage, isFetching, isPending, hasNextPage } =
    useInfiniteQuery<{
      list: PostItemModel[];
      isNextPage: boolean;
    }>({
      queryKey: ["items", "blog", category, item, search],
      queryFn: async ({ pageParam }) => {
        const limit = 10;
        const cursor = pageParam !== 0 ? pageParam : null; // 일단 초기 0, APi 변경후에 받을예정임

        let baseUrl = `post?cursor=${cursor}&limit=${limit}`;

        if (category) {
          baseUrl += `&category=${category}`;
        }

        if (item) {
          baseUrl += `&group=${item}`;
        }

        if (search) {
          baseUrl += `&keyword=${search.trim()}`;
        }
        const response = await axiosApi.get(baseUrl);
        console.log(response.data);
        return response.data.result;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.isNextPage) {
          return lastPage.list.at(-1)?.post_id;
        }
      },
      initialPageParam: 0,
      placeholderData: undefined,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (!ref.current) return;

    const currentRef = ref.current;

    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entity) => {
          if (entity.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 }
    );

    io.observe(currentRef);

    return () => {
      io.unobserve(currentRef);
      io.disconnect();
    };
  }, [data, fetchNextPage]);

  const flatData = data?.pages.flatMap((e) => e.list);

  return (
    <>
      {isPending ? (
        <SpinnerLoading />
      ) : flatData && flatData.length > 0 ? (
        <AnimatePresence mode="wait">
          <div className="mt-10  grid grid-cols-2 gap-3">
            {flatData.map((item, idx) => {
              return <BlogContentsItem key={`item-${idx}`} {...item} />;
            })}
          </div>
        </AnimatePresence>
      ) : (
        <div>
          {search && search.trim() === "" ? (
            <NonData message={"등록된 데이터가 없습니다."} />
          ) : (
            <NonData message={`"${search}" 검색 데이터가 없습니다.`} />
          )}
        </div>
      )}
      {isFetching &&
        Array.from({ length: 6 }).map((_, idx) => {
          return (
            <div key={`skeleton-${idx}`}>
              <div className="bg-foreground/10  aspect-[16/9] animate-pulse " />
              <div className="flex flex-col gap-3 mt-4">
                <div className="bg-foreground/10 animate-wiggle w-[100px] h-3 rounded-full"></div>
                <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
                <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
              </div>
            </div>
          );
        })}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};

export default BlogList;
