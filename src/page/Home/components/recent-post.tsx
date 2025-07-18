import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { Heart, PersonStanding } from "lucide-react";
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
      className="util-h-screen flex flex-col items-center justify-start bg-zinc-950  z-11 w-screen absolute "
    >
      <div
        data-sec
        className=" overflow-y-auto util-scrollbar  flex flex-col bg-cover items-center justify-start  w-screen "
      >
        <div className=" grid layout-center   pt-40 md:pt-60 pb-30 w-full ">
          <div className=" mb-5">
            <h1
              data-animate
              className="text-5xl  md:text-6xl font-black  font-Montserrat mt-3   leading-tight  flex items-center gap-2 group cursor-pointer  pb-5 "
            >
              Dev' Blog
            </h1>

            <div
              data-animate
              className="text-sm md:text-xl mb-5 mt-3  leading-relaxed"
            >
              <p className="  ">
                저를 <span className="text-teal-300">"기록"</span>
                하는 공간 입니다
              </p>
              <p className="">
                어제보다 나은 개발자가 되기 위한 고민과 배움을 기록합니다.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-2  md:gap-2">
            {data?.slice(0, 3).map((blogMeta, idx) => {
              return (
                <div
                  onClick={() => nav(`/blog/${blogMeta.post_id}`)}
                  data-animate
                  key={`post:${idx}`}
                  className="grid  gap-5 group items-center bg-neutral-900 shadow-2xl shadow-black/40 p-6 md:p-8 rounded-lg"
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
                    <h1 className="text-lg group-hover:text-teal-300  leading-relaxed mt-2 mb-5 max-w-[300px] break-keep">
                      {blogMeta.post_title}
                    </h1>
                    <p className="line-clamp-2 mt-auto text-xs md:text-sm text-muted-foreground leading-relaxed">
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
          </div>
        </div>
      </div>
    </section>
  );
});

export default RecentPosts;
