import { axiosApi } from "@/config/axios.config";
import { requestHandler } from "@/utils/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { Heart, PersonStanding } from "lucide-react";
import { forwardRef } from "react";

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
      className="h-screen flex flex-col items-center justify-start bg-zinc-950  z-11 w-screen absolute "
    >
      <div
        data-sec
        className=" overflow-y-auto  max-h-screen flex flex-col bg-cover items-center justify-start  w-screen "
      >
        <div className=" grid layout-center   pt-40 md:pt-60 pb-30 w-full ">
          <div className=" mb-5">
            <h1
              data-animate
              className="text-5xl  md:text-6xl font-black  font-Montserrat mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-5 "
            >
              DEV' Blog
            </h1>

            <div
              data-animate
              className="text-sm md:text-xl mb-5 mt-3  leading-relaxed"
            >
              <p className="  ">
                저의 <span className="text-teal-300">"프로젝트 기록"</span>
                입니다.
              </p>
              <p className="">
                Next와 React를 학습하고 실전에 녹여낸 개인 프로젝트 입니다.
              </p>
            </div>
          </div>{" "}
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
          </div>
        </div>
      </div>
    </section>
  );
});

export default RecentPosts;
