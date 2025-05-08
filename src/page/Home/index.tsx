import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { ChevronRight } from "lucide-react";

const PATHS = [
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Project",
    to: "/about",
  },
  {
    label: "Blog",
    to: "/about",
  },
];

const Home = () => {
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

            <div className="flex gap-2 animate-leftIn ani-delay-0.9 opacity-0  ">
              <Button
                className="rounded-lg size-10 bg-transparent! border border-border"
                variant={"outline"}
                onClick={() => window.open("https://open.kakao.com/o/sq4skkTf")}
              >
                <Kakao className=" fill-foreground opacity-50" />
              </Button>
              <Button
                className="rounded-lg size-10 bg-transparent!  border border-border"
                variant={"outline"}
                onClick={() => window.open("https://github.com/phm6530/")}
              >
                <GitSvg className=" fill-foreground opacity-50" />
              </Button>
              <Button
                className="rounded-lg size-10 bg-transparent!  border border-border"
                variant={"outline"}
                onClick={() => window.open("https://blog.h-creations.com/")}
              >
                <BlogSvg className=" fill-foreground opacity-50" />
              </Button>
            </div>
          </div>

          <div className="w-1/2  flex flex-col gap-10">
            {/* 블로그 포스트 섹션 */}
            <div className="space-y-6 animate-leftIn ani-delay-1.1 opacity-0">
              <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] text-indigo-200">
                  RECENT POSTS
                </span>
                <ChevronRight
                  size={15}
                  className="opacity-50 group-hover:opacity-100 transition-all text-indigo-200"
                />
              </h3>

              {/* 블로그 포스트 1 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-800/50 rounded-md overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-xs">Image</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                    Next.js - CMS BLOG (1)
                  </h4>
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    기술적 성장과 커리어 발전을 위한 프론트엔드 개발자의 학습
                    로드맵
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
              </div>

              {/* 블로그 포스트 2 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-800/50 rounded-md overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-xs">Image</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                    AWS 클라우드 서비스 활용 가이드
                  </h4>
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    웹 개발자를 위한 AWS 서비스 선택 및 비용 최적화 전략
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/40">
                      Apr 28, 2025
                    </span>
                    <span className="text-[10px] py-0.5 px-2 bg-white/10 text-white/60 rounded-full">
                      AWS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 블로그 포스트 섹션 */}
            <div className="space-y-6 animate-leftIn ani-delay-1.1 opacity-0">
              <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
                <span className="text-[11px] text-indigo-200">
                  RECENT POSTS
                </span>
                <ChevronRight
                  size={15}
                  className="opacity-50 group-hover:opacity-100 transition-all text-indigo-200"
                />
              </h3>

              {/* 블로그 포스트 1 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-800/50 rounded-md overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-xs">Image</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                    Next.js - CMS BLOG (1)
                  </h4>
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    기술적 성장과 커리어 발전을 위한 프론트엔드 개발자의 학습
                    로드맵
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
              </div>

              {/* 블로그 포스트 2 */}
              <div className="flex gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-800/50 rounded-md overflow-hidden flex items-center justify-center">
                  <span className="text-white/20 text-xs">Image</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                    AWS 클라우드 서비스 활용 가이드
                  </h4>
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    웹 개발자를 위한 AWS 서비스 선택 및 비용 최적화 전략
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/40">
                      Apr 28, 2025
                    </span>
                    <span className="text-[10px] py-0.5 px-2 bg-white/10 text-white/60 rounded-full">
                      AWS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 소셜 미디어 아이콘 */}
      {/* 소셜 미디어 아이콘 - VIEW PORTFOLIO 버튼 대체 */}
    </main>
  );
};

export default Home;
