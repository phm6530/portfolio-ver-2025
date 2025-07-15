import { Button } from "@/components/ui/button";
import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Heart, PersonStanding } from "lucide-react";
import { forwardRef } from "react";
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

const RecentPosts = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();
  const { data } = useQuery({
    queryKey: ["MAIN_CONTENTS"],
    queryFn: async () => {
      // 10개 가져오기
      const { result: blogList } = await requestHandler<{
        result: { list: PostItemModel[] };
      }>(async () => axiosApi.get(`post?category=all&group=all`));
      console.log(blogList);
      return blogList.list;
    },
    staleTime: Infinity,
  });

  return (
    <section
      ref={(el) => {
        if (el && ref && "current" in ref) {
          const arrayRef = ref.current!;
          if (!arrayRef.includes(el)) {
            arrayRef.push(el);
          }
        }
      }}
      className="h-screen flex flex-col items-center justify-start bg-zinc-950  z-11 w-screen absolute overflow-y-auto"
    >
      <div className="layout-center py-20 grid  gap-20  pt-50 ">
        <div className="">
          <h1
            data-animate
            className="text-5xl font-semibold  md:text-6xl font-Montserrat mt-3 tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-2 "
          >
            Dev Blog
          </h1>
          <div data-animate className="grid gap-10   justify-start">
            <div className="text-base md:text-xl flex flex-col gap-3 mt-5">
              <p className="break-keep leading-relaxed ">
                개발, 그리고 기술에 관한{" "}
                <span className="text-teal-300 ">'기록공간'</span> 입니다.{" "}
              </p>
              <p className="text-sm text-muted-foreground">
                해당 리스트는 개인 블로그의 고정 콘텐츠 Api를 호출합니다.
              </p>
            </div>{" "}
          </div>{" "}
        </div>
        <div className="grid md:grid-cols-3 gap-2  md:gap-2">
          {data?.slice(0, 3).map((blogMeta, idx) => {
            return (
              <div
                data-animate
                key={`post:${idx}`}
                className="grid  gap-5 group items-center bg-neutral-800 shadow-2xl shadow-black/40 p-8 rounded-xl"
              >
                {/* <div
                  className="aspect-[9/9] rounded-xl bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${blogMeta.thumbnail_url})` }}
                >
                  <span className="absolute left-4 top-4  text-xs bg-red-50/20 p-1 px-2 rounded-full">
                    {blogMeta.sub_group_name}
                  </span>
                </div> */}
                <div className="flex flex-col  h-full  rounded-b-xl cursor-pointer">
                  <span className=" left-4 top-4  text-xs   rounded-full text-indigo-200">
                    {blogMeta.sub_group_name}
                  </span>
                  <h1 className="text-lg group-hover:text-teal-300  leading-relaxed mt-2 mb-10 max-w-[300px] break-keep">
                    {blogMeta.post_title}
                  </h1>
                  <p className="line-clamp-2 mt-auto text-sm text-muted-foreground leading-relaxed">
                    {blogMeta.post_description}
                  </p>
                  <div className="flex gap-5 text-xs opacity-70 mt-7">
                    <div className="flex  items-center ">
                      <span className="flex ">
                        <PersonStanding
                          size={20}
                          className="text-muted-foreground"
                        />{" "}
                      </span>
                      {blogMeta.comment_count}
                    </div>
                    <div className="flex items-center gap-2 ">
                      <span className="flex">
                        <Heart size={15} className="text-muted-foreground" />
                      </span>
                      {blogMeta.like_cnt}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}{" "}
          <div>
            <Button
              data-animate
              className="text-xs p-6! px-5! flex gap-10 mt-10"
              size={"sm"}
              onClick={() => nav("/about")}
            >
              자세히보기 <ChevronRight size={12} />
            </Button>{" "}
          </div>
        </div>
      </div>
    </section>
  );
});

export default RecentPosts;
