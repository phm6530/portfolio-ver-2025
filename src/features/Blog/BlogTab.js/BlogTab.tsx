import AccodianTab from "@/features/Blog/BlogTab.js/BlogTabAcodian";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/services/queryKey";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();

  const { data, isLoading } = useQuery({
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
    <div className="flex flex-col">
      {data &&
        !isLoading &&
        Object.keys(data?.category).map((category, idx) => {
          const item = data.category[category];

          return (
            <>
              {idx === 0 && (
                <div
                  className="flex items-center gap-1"
                  onClick={() => navigation("/blog")}
                >
                  ALL
                  <span className="text-sm mt-[2px] text-count">
                    ({data.count} )
                  </span>
                </div>
              )}
              <AccodianTab key={idx} idx={idx} {...item} />
            </>
          );
        })}
    </div>
  );
};

export default BlogTab;
