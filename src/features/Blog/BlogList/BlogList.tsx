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

const Contents = styled.div`
  flex-direction: column;
  border-radius: 1em;
  flex-grow: 1;
  width: 100%;
  padding-top: 2rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const BlogList = (): JSX.Element => {
  // const { data, isLoading } = useBlog();

  const ref = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const item = searchParams.get("item");
  const search = searchParams.get("search");

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

        if (category && item) {
          baseUrl += `&category=${category}&group=${item}`;
        }

        if (search) {
          baseUrl += `&keyword=${search.trim()}`;
        }

        const tet = await requestHandler<{
          result: {
            list: Array<PostItemModel>;
            isNextPage: boolean;
          };
        }>(async () => {
          return await axiosApi.get(baseUrl);
        });
        console.log(tet.result);
        return tet.result;
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
          <Motion.FadeInOut key={location.search}>
            <Contents>
              {flatData.map((item, idx) => {
                return <BlogContentsItem key={`item-${idx}`} {...item} />;
              })}
            </Contents>
          </Motion.FadeInOut>
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

      {isFetching && <SpinnerLoading />}
      {hasNextPage && <div ref={ref} />}
    </>
  );
};

export default BlogList;
