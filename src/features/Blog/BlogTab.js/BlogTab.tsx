import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/services/queryKey";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export type CategoryModel = {
  id: number;
  name: string;
  postCnt: number;
  subGroups: {
    id: number;
    subGroupName: string;
    thumb: string | null;
    postCount: number;
  }[];
};

const BlogTab = () => {
  const nav = useNavigate();
  const [qs] = useSearchParams();
  const { data } = useQuery({
    queryKey: [queryKey.blogCategory],
    queryFn: async () => {
      const { result } = await requestHandler<{
        success: boolean;
        result: {
          category: {
            [key: string]: CategoryModel;
          };
          count: number;
        };
      }>(() => axiosApi.get("/category"));
      return result;
    },
    staleTime: Infinity,
  });

  return (
    <>
      <div className="flex  flex-wrap gap-2 bg-transparent!  rounded-none mb-3 ">
        {data &&
          ["all", ...Object.keys(data?.category)].map((e) => {
            const item = data.category[e];
            return (
              <span
                key={`category-value-${e}`}
                onClick={() => nav(`/blog?category=${e}`)}
                className={cn(
                  "bg-transparent! text-muted-foreground flex gap-1 text-xs rounded-full border p-2 px-3 border-muted-foreground/30 cursor-pointer hover:border-indigo-200",
                  (qs.get("category") === e ||
                    (qs.get("category") === null && e === "all")) &&
                    "border-indigo-200 text-indigo-200"
                )}
              >
                {e === "all" ? "전체보기" : e}
                <span className="text-xs text-indigo-300">
                  ({e === "all" ? data.count : item.postCnt})
                </span>
              </span>
            );
          })}
      </div>
    </>
  );
};

export default BlogTab;
