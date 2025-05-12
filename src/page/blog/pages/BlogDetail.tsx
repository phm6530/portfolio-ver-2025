import { useNavigate, useParams } from "react-router-dom";
import { SpinnerLoading } from "@/component/loading/SpinnerLoading";
import NotfoundPage from "@/component/error/NotfoundPage";

import { queryKey } from "@/services/queryKey";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { DateUtils } from "@/utils/dateUtil";
import {
  EditorProvider,
  SimpleEditorContents,
  useSimpleEditor,
} from "@squirrel309/my-testcounter";
import { HtmlContentNormalizer } from "@/utils/HtmlContentNormalizer";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, List, NotebookPen } from "lucide-react";
import imgUrlMapper from "@/utils/imgUrl-mapping";
import BlogDetailSkeleton from "./blogdetail-skeleton";
import LoadingSpiner from "@/components/ui/loading-spiner";

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
  const { editor } = useSimpleEditor({ editable: false });

  const nav = useNavigate();

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
      <div className="relative min-h-[400px]">
        <LoadingSpiner />
      </div>
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
    <section>
      {/* Editor View header */}
      <div className=" pb-5 border-b border-border animate-topIn opacity-0 ani-delay-0.2">
        <Badge
          className="rounded-full border border-border bg-white/5"
          variant={"outline"}
        >
          {sub_group_name}
        </Badge>

        <h1 className="text-3xl py-5"> {post_title}</h1>

        <span className="text-xs opacity-50">
          {DateUtils.dateFormatKR(created_at, "YYYY. MM. DD")}
        </span>
      </div>
      <div className="border-y py-3 [&>button]:text-xs [&>button]:px-4 flex  border-border divide-x divide-border animate-topIn opacity-0 ani-delay-0.3">
        <button
          className="flex gap-2 items-center opacity-70 hover:opacity-100"
          onClick={() => nav("/blog")}
        >
          <List size={13} />
          목록으로
        </button>
        <button
          className="flex gap-2 items-center opacity-70 hover:opacity-100"
          onClick={() =>
            window.open(`https://blog.h-creations.com/post/${id}`, "_blank")
          }
        >
          <ExternalLink size={13} />내 블로그에서 보기
        </button>
      </div>

      {!!blog_metadata.thumbnail_url && (
        <div
          className="  bg-red-100 mt-10 rounded-2xl aspect-[16/9] md:aspect-[16/5] bg-cover bg-center animate-topIn opacity-0 ani-delay-0.4"
          style={{
            backgroundImage: `url(${imgUrlMapper({ thumbnail: blog_metadata.thumbnail_url })})`,
          }}
        />
      )}
      <div className="border-b border-border animate-topIn opacity-0 ani-delay-0.5">
        <EditorProvider editor={editor}>
          <SimpleEditorContents
            value={HtmlContentNormalizer.setImgUrl(contents)}
          />
        </EditorProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <button
          className="article-hover justify-center p-5 cursor-pointer text-sm rounded-lg flex gap-2 items-center"
          onClick={() => window.open(`https://blog.h-creations.com`, "_blank")}
        >
          Blog 바로가기
          <ExternalLink />
        </button>
        <button
          className="article-hover p-5 cursor-pointer text-sm rounded-lg"
          onClick={() => nav("/board")}
        >
          방명록 한줄 남기기
        </button>
      </div>
    </section>
  );
};

export default BlogDetail;
