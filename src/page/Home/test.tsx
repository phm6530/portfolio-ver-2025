import { Button } from "@/components/ui/button";

import { ArrowRight, ChevronRight } from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {}, { scope: "" });

  return (
    <main
      ref={ref}
      className={`min-h-screen bg-zinc-900 text-white p-6 md:p-10`}
    >
      {/* <ShootingStar /> */}
      {/* 메인 콘텐츠 영역 */}
      {/* <div
        className={cn(`absolute top-0 left-0  z-0 w-full h-full 
      after:z-0 after:absolute after:inset-0 
      after:content-[''] after:bg-cover after:bg-center after:bg-no-repeat
      after:bg-gradient-to-r after:from-zinc-900/0 after:to-zinc-900/90
      after:pointer-events-none after:animate-opacity 
`)}
      /> */}
      <div className="glow-5  absolute -bottom-80 left-0 size-150 bg-violet-400/20 blur-[100px] rounded-full"></div>
      <div className="glow-5 absolute -top-3/5 right-1 size-200 bg-gradient-to-b to-indigo-800/20 from-violet-50/100 blur-[100px] rounded-full"></div>

      <div className="layout-center grid grid-cols-[400px_1fr] py-[150px] md:py-[150px] flex-col md:flex-row md:gap-30 min-h-[100vh]">
        <div>
          <div className="   md:sticky md:top-[100px] ">
            <h1 className="text-3xl md:text-5xl font-light mb-4 leading-13">
              <span className="font-normal">Phm .</span>
              <br />
              <span className="font-semibold bg-clip-text bg-gradient-to-l from-white to-indigo-300 text-transparent">
                Frontend
              </span>
              <span className="size-2  inline-block ml-2 bg-red-300 rounded-full relative">
                <span className="size-3 absolute  inline-block  bg-red-200 rounded-full inset-0 animate-ping"></span>
              </span>
              <br /> Developer <br />{" "}
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed mt-6 mb-6 max-w-[400px] break-keep">
              전문성 있는 프론트엔드 개발자로 성장하고자 합니다. 트랜디 한
              기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.
            </p>
            <div className="text-gray-500 text-xs mt-8 mb-10">
              <a
                href="mailto:example@email.com"
                className="block mb-1 hover:text-indigo-200 transition-colors"
              >
                example@email.com
              </a>
              <Link
                to="https://github.com/phm6530"
                className="block mb-1 hover:text-indigo-200 transition-colors"
              >
                github.com/phm6530
              </Link>
            </div>
            <Button className="rounded-full text-xs p-4 px-6!">
              About me <ArrowRight />
            </Button>
            {/* <SubNav /> */}
          </div>
        </div>

        {/* 오른쪽 컨텐츠 영역 - 충분한 높이 부여 */}
        <div className="flex-1 flex flex-col gap-20 ">
          <div className="space-y-2 animate-leftIn ani-delay-1.1 opacity-0">
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
              <span className="text-[11px] text-orange-300 text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                RECENT PROJECT
              </span>{" "}
              <ChevronRight
                size={15}
                className="opacity-50 group-hover:opacity-100 transition-all text-indigo-200"
              />
            </h3>
            {/* PROJECT - 최근 1개 */}
            <RecentProject />
          </div>

          <div className="space-y-2 animate-leftIn ani-delay-1.1 opacity-0">
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer">
              <span className="text-[11px]  text-orange-300 text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
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
    </main>
  );
};

export default Home;
