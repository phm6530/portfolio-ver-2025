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
        <TabsList className="flex gap-4 bg-transparent!  rounded-none mb-3 ">
          {data &&
            ["all", ...Object.keys(data?.category)].map((e) => {
              const item = data.category[e];

              return (
                <TabsTrigger
                  key={`category-value-${e}`}
                  value={e}
                  className="border-0 px-0 bg-transparent! pb-4 shadow-none! text-sm rounded-none border-b-2  data-[state=active]:border-b-2! data-[state=active]:text-indigo-200! data-[state=active]:border-indigo-200! "
                >
                  {e === "all" ? "전체보기" : e} (
                  {e === "all" ? data.count : item.postCnt})
                </TabsTrigger>
              );
            })}
        </TabsList>
      </Tabs>
    </>
  );
};

export default BlogTab;
