import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/services/queryKey";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogTabDetail from "./BlogTabDetail";
import { useNavigate } from "react-router-dom";
import SearchField from "@/components/shared/search-input-field";

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
    <>
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(e) => nav(`/blog?category=${e}`)}
      >
        <TabsList className="flex gap-2 bg-transparent!  rounded-none mb-3 ">
          {data &&
            ["all", ...Object.keys(data?.category)].map((e) => {
              const item = data.category[e];

              return (
                <TabsTrigger
                  key={`category-value-${e}`}
                  value={e}
                  className="border-0 bg-transparent! pb-4 shadow-none! rounded-none border-b-4  data-[state=active]:border-b-4! data-[state=active]:border-foreground!"
                >
                  {e === "all" ? "전체보기" : e} (
                  {e === "all" ? data.count : item.postCnt})
                </TabsTrigger>
              );
            })}{" "}
        </TabsList>{" "}
        {data &&
          !isLoading &&
          ["all", ...Object.keys(data?.category)].map((category, idx) => {
            const item = data.category[category];

            const faltData =
              idx === 0
                ? Object.keys(data?.category).flatMap(
                    (e) => data.category[e].subGroups
                  )
                : [];

            if (idx === 0) {
              return (
                <React.Fragment key={`blog-tab-${idx}`}>
                  <TabsContent value={category}>
                    <div className="flex flex-wrap gap-2">
                      {faltData.map((item, idx) => {
                        return (
                          <BlogTabDetail
                            category={category}
                            item={item.subGroupName}
                            post_count={item.postCount}
                            post_new={false}
                            key={`${item}-${idx}`}
                          />
                        );
                      })}
                    </div>
                  </TabsContent>
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={`blog-tab-${idx}`}>
                <TabsContent value={category}>
                  <div className="flex flex-wrap gap-2">
                    {item.subGroups.map((item, idx) => {
                      return (
                        <BlogTabDetail
                          category={category}
                          item={item.subGroupName}
                          post_count={item.postCount}
                          post_new={false}
                          key={`${item}-${idx}`}
                        />
                      );
                    })}
                  </div>
                </TabsContent>
              </React.Fragment>
            );
          })}
      </Tabs>
    </>
  );
};

export default BlogTab;
