import { useParams } from "react-router-dom";
import { SpinnerLoading } from "component/loading/SpinnerLoading";
import QuillView from "component/editor/QuillView";
import NotfoundPage from "component/error/NotfoundPage";

import * as S from "./BlogDetailStyle";
import { queryKey } from "services/queryKey";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { DateUtils } from "utils/dateUtil";

export enum POST_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
  PRIVATE = "private",
}

export interface BlogMetadata {
  post_id: number;
  post_title: string;
  post_description: string;
  created_at: string;
  update_at: string;
  sub_group_id: number;
  author_id: number;
  thumbnail_url: string;
  status: POST_STATUS;
  img_key: string;
  category_id: number;
  like_cnt: number;
}

export interface BlogContents {
  content_id: number;
  post_id: string;
  contents: string;
}

type BlogSubGroup = {
  sub_group_id: 1;
  sub_group_name: "react";
  group_id: 1;
  default_thum: null;
};

export interface BlogDetailResponse {
  blog_metadata: BlogMetadata;
  blog_contents: BlogContents;
  blog_sub_group: BlogSubGroup;

  category: {
    group_id: number;
    group_name: string;
  };
  pinned_post: null | {
    id: number;
    createdAt: string;
    post_id: number;
    active: boolean;
    order: number;
  };
}

const BlogDetail = (): JSX.Element => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<BlogDetailResponse>({
    queryKey: [queryKey.blogDetail, id],
    queryFn: async () => {
      const { result } = await requestHandler<{
        result: BlogDetailResponse;
      }>(async () => axiosApi.get(`/post/${id}`));
      return result;
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <>
        <SpinnerLoading />
      </>
    );
  }

  if (isError || !data || !id) {
    return (
      <>
        <NotfoundPage redirectPath={"/blog"} />
      </>
    );
  }

  const { blog_metadata, blog_contents, blog_sub_group } = data;
  const { post_title, created_at, post_id } = blog_metadata;
  const { contents } = blog_contents;
  const { sub_group_name } = blog_sub_group;

  return (
    <>
      <div>
        {/* Editor View header */}
        <S.PostDetailHeader>
          <S.CateGroy>{sub_group_name}</S.CateGroy>

          <S.PostTitle>{post_title}</S.PostTitle>
          {DateUtils.dateFormatKR(created_at, "YYYY. MM. DD")}
          <p></p>
          {/* 
                    <S.PostInfo>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <S.UserPictrue>
                                <img src="/img/me.jpg" alt="me" />
                            </S.UserPictrue>
                            {data.user}

                            <S.SummaryDataAlign date={data.create_date} />
                        </div>
                    </S.PostInfo> */}
        </S.PostDetailHeader>

        {/* Quill View */}
        <S.QuillViewWrapper>
          <QuillView contents={contents} />

          {/* {data?.update_date && (
                        <PostTimestamp
                            style={{
                                marginTop: '5rem',
                                display: 'block',
                            }}
                            message={'게시물 최근 수정 일'}
                            date={data.update_date}
                        />
                    )} */}

          <div
            className="border border-amber-200 p-5 cursor-pointer"
            onClick={() =>
              window.open(
                `https://blog.h-creations.com/post/${post_id}`,
                "_blank"
              )
            }
          >
            Me 블로그 바로가기
          </div>
        </S.QuillViewWrapper>

        {/* <BlogPostRelatedList category={data.category} /> */}
      </div>
    </>
  );
};

export default BlogDetail;
