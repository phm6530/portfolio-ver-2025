import { Button } from "@/components/ui/button";
import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Heart, PersonStanding } from "lucide-react";
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
    <div className="layout-center py-20 grid  gap-10 pt-50 ">
      <div className="">
        <h1
          data-animate
          className="text-3xl text-zinc-900 md:text-6xl font-Montserrat mt-3 tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-2 "
        >
          Dev Blog
        </h1>
        <div data-animate className="flex gap-6 mb-10 justify-between">
          <div className="text-base md:text-xl flex flex-col gap-3 mt-5">
            <p className="break-keep leading-relaxed text-zinc-900">
              개발, 그리고 기술에 관한{" "}
              <span className="text-teal-300 ">'기록공간'</span> 입니다.{" "}
            </p>
            <p className="text-sm text-secondary">
              해당 리스트는 개인 블로그의 고정 콘텐츠 Api를 호출합니다.
            </p>
          </div>{" "}
          <Button
            className="text-xs p-6! px-5! flex gap-10"
            size={"sm"}
            onClick={() => nav("/about")}
          >
            자세히보기 <ChevronRight size={12} />
          </Button>{" "}
        </div>{" "}
        {/* <div className="mt-10 flex gap-2">
          <button className="article-hover p-5 flex items-center gap-10">
            자세히보기 <ChevronRight size={22} />
          </button>
          <button className="article-hover p-5 flex items-center gap-10">
            블로그 바로가기 <ChevronRight size={22} />
          </button>
        </div> */}
      </div>
      <div className="grid grid-cols-3 md:gap-10">
        {data?.slice(0, 6).map((blogMeta, idx) => {
          console.log(blogMeta);
          return (
            <div
              data-animate
              key={`post:${idx}`}
              className="grid gap-4 items-center"
            >
              <div
                className="aspect-[16/9] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${blogMeta.thumbnail_url})` }}
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-xl text-zinc-900">{blogMeta.post_title}</h1>
                <p className="line-clamp-2 text-sm text-secondary leading-relaxed">
                  {blogMeta.post_description}
                </p>
                <div className="flex gap-5 text-xs opacity-70">
                  <div className="flex  items-center text-zinc-900">
                    <span className="flex ">
                      <PersonStanding
                        size={20}
                        className="text-muted-foreground"
                      />{" "}
                    </span>
                    {blogMeta.comment_count}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-900">
                    <span className="flex">
                      <Heart size={15} className="text-muted-foreground" />
                    </span>
                    {blogMeta.like_cnt}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}
