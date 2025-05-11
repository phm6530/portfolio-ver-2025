import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import { axiosApi } from "@/config/axios.config";
import { useNavigate } from "react-router-dom";
import { DateUtils } from "@/utils/dateUtil";
import SupabasePool from "@/lib/supabaseClient";
import { ProjectPostProps } from "@/type/ProjectTypes";

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

const Home = () => {
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

  const { data: projectOne } = useQuery<ProjectPostProps[]>({
    queryKey: ["RECENT_PROJECT"],
    queryFn: async () => {
      const pool = SupabasePool.getInstance();
      const { data } = await pool
        .from("project_meta")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);
      return data as ProjectPostProps[];
    },
    staleTime: Infinity,
  });

  const nav = useNavigate();

  return (
    <main className="h-screen text-white overflow-hidden relative">
      <BackgroundImgCover imgSrc="/vanner/vanner_3.jpg">
        <ShootingStar />
        {/* <StarAnimation /> */}
      </BackgroundImgCover>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col h-full layout-center justify-center">
        <div className="relative flex w-full gap-30">
          {/* 오른쪽 영역 - 개발자 프로필 */}
          <div className="w-1/2  flex flex-col justify-center">
            {/* 섹션 인디케이터 */}
            <div className="flex items-center gap-3 mb-4 text-white/40 animate-leftIn ani-delay-0.5 opacity-0">
              <div className="text-xs tracking-wider">DEV & Publisher</div>
            </div>

            <h1 className="text-6xl animate-leftIn ani-delay-0.6 opacity-0">
              Phm
              <span className="text-red-300 font-semibold">'</span>
            </h1>
            <h1 className="animate-leftIn ani-delay-0.7 opacity-0">
              <span className="text-8xl bg-clip-text bg-gradient-to-t from-indigo-100 via-white to-indigo-300 text-transparent font-bold">
                Developer
              </span>
            </h1>

            <p className="text-white/60 text-sm max-w-md leading-relaxed py-7 animate-leftIn ani-delay-0.8 opacity-0 ">
              전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>새로운
              기술을 학습하며, 익숙해지는 것에 전념하고 있습니다. <br></br>
              경험을 통해 지속적으로 발전하는 개발자가 되겠습니다.
            </p>
            <div className="flex gap-2 animate-leftIn ani-delay-0.9 opacity-0">
              <Button
                className="rounded-lg size-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-300/30 transition-all duration-300 group"
                variant={"outline"}
                onClick={() => window.open("https://open.kakao.com/o/sq4skkTf")}
              >
                <Kakao className="fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
              </Button>
              <Button
                className="rounded-lg size-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-300/30 transition-all duration-300 group"
                variant={"outline"}
                onClick={() => window.open("https://github.com/phm6530/")}
              >
                <GitSvg className="fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
              </Button>
              <Button
                className="rounded-lg size-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-300/30 transition-all duration-300 group"
                variant={"outline"}
                onClick={() => window.open("https://blog.h-creations.com/")}
              >
                <BlogSvg className="fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
              </Button>
            </div>
          </div>

          <div className="w-1/2  flex flex-col gap-10">
            <div className="space-y-2 animate-leftIn ani-delay-1.1 opacity-0">
              <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] text-indigo-200 text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                  RECENT PROJECT
                </span>
              </h3>

              {projectOne?.map((project) => {
                return (
                  <div className="flex flex-col gap-2 group cursor-pointer article-hover border-indigo-200 shadow-[0_5px_30px_rgba(99,102,241,0.25)]  p-5  bg-white/3 w-full rounded-lg">
                    <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-200 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-white/50  line-clamp-3 mb-5 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-white/40">
                        May 5, 2025
                      </span>
                      <span className="text-[10px] py-0.5 px-2 bg-white/10 text-white/60 rounded-full">
                        Frontend
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 블로그 포스트 섹션 */}
            <div className="space-y-2 animate-leftIn ani-delay-1.1 opacity-0">
              <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] text-indigo-200 text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                  RECENT POSTS
                </span>
                <ChevronRight
                  size={15}
                  className="opacity-50 group-hover:opacity-100 transition-all text-indigo-200"
                />
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {data?.slice(0, 2).map((blogMeta, idx) => {
                  return (
                    <div
                      key={`post:${blogMeta.post_id}:${idx}`}
                      className="flex flex-col gap-2 group cursor-pointer article-hover  p-5  bg-white/3 rounded-lg"
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
