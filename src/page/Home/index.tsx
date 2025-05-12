import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { ChevronRight } from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";

const Home = () => {
  return (
    <main className="md:h-screen text-white overflow-hidden relative">
      <BackgroundImgCover imgSrc="/vanner/vanner_3.jpg">
        {/* <ShootingStar /> */}
      </BackgroundImgCover>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col h-full layout-center md:justify-center md:py-0 py-40">
        <div className="relative flex md:flex-row flex-col w-full gap-20 md:gap-30">
          {/* 오른쪽 영역 - 개발자 프로필 */}
          <div className="md:w-1/2  flex flex-col gap-4 md:gap-0 justify-center text-center md:text-left">
            {/* 섹션 인디케이터 */}

            <div>
              {" "}
              <div className="flex items-center gap-3 mb-4 text-white/40 animate-leftIn ani-delay-0.5 opacity-0 justify-center md:justify-start">
                <div className="text-xs tracking-wider">DEV & Publisher</div>
              </div>
              <h1 className="lg:text-6xl md:text-5xl text-5xl font-semibold animate-leftIn ani-delay-0.6 opacity-0">
                Phm
                <span className="text-red-300 font-semibold">'</span>
              </h1>
              <h1 className="animate-leftIn ani-delay-0.7 opacity-0">
                <span className="lg:text-8xl text-7xl bg-clip-text bg-gradient-to-t from-indigo-100 via-white to-indigo-300 text-transparent font-bold">
                  Developer
                </span>
              </h1>
            </div>

            <p className="text-white/60 text-sm  max-w-md leading-relaxed py-7 animate-leftIn ani-delay-0.8 opacity-0 mx-auto md:mx-0">
              전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>
              트랜디 한 기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.{" "}
              <br></br>
            </p>
            <div className="flex gap-2 animate-leftIn ani-delay-0.9 opacity-0 mx-auto md:mx-0">
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

          <div className="md:w-1/2  flex flex-col gap-10">
            <div className="space-y-2 animate-leftIn ani-delay-1.1 opacity-0">
              <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] text-indigo-200 text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                  RECENT PROJECT
                </span>
              </h3>
              {/* PROJECT - 최근 1개 */}
              <RecentProject />
            </div>

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
              {/* PINNED POST - BLOG API 사용 */}
              <RecentPosts />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
