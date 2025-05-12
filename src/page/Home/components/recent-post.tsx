import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { DateUtils } from "@/utils/dateUtil";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  comment_count: number;
};

export default function RecentPosts() {
  const nav = useNavigate();
  const { data } = useQuery({
    queryKey: ["MAIN_CONTENTS"],
    queryFn: async () => {
      // 10개 가져오기
      const { result: blogList } = await requestHandler<{
        result: PostItemModel[];
      }>(async () => axiosApi.get(`pinned`));
      console.log(blogList);
      return blogList;
    },
    staleTime: Infinity,
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      {data?.slice(0, 2).map((blogMeta, idx) => {
        return (
          <div
            key={`post:${blogMeta.post_id}:${idx}`}
            className="flex flex-col gap-2 group cursor-pointer   pt-5  border-t border-indigo-200/60"
            onClick={() => nav(`/blog/${blogMeta.post_id}`)}
          >
            <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-200 transition-colors">
              {blogMeta.post_title}
            </h4>
            <p className="text-xs text-white/50 mb-2 line-clamp-2">
              {blogMeta.post_description}
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <span className="text-[10px] text-white/40">
                {DateUtils.formatStyledShort(blogMeta.created_at)}
              </span>
              <span className="text-[10px] py-0.5 px-2 bg-white/10 text-white/60 rounded-full">
                {blogMeta.sub_group_name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
