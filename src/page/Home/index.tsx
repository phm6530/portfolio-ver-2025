import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import {
  ArrowRight,
  ArrowRightCircle,
  ArrowRightFromLine,
  ChevronRight,
  Code2,
  CodeXml,
  CurlyBracesIcon,
  TestTube,
  UserCheck2,
} from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {}, { scope: "" });

  return (
    <main
      ref={ref}
      className={`md:min-h-screen animate-opacity text-white overflow-hidden relative flex justify-center bg-zinc-900`}
      // style={{
      //   backgroundImage: "url(/vanner/vanner_3.jpg)",
      //   backgroundPosition: "center bottom",
      //   backgroundAttachment: "fixed",
      // }}
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
      <div
        className={`glow-5 z-0! absolute top-[50%] left-[50%] -translate-y-[70%]  size-1/3 bg-gradient-to-l to-red-500/30 via-indigo-500/50 from-red-500/60 blur-[100px] rounded-full transition-colors duration-700`}
      />
      <div className="layout-center py-[150px] md:py-[200px] flex flex-col   gap-30">
        <div className="text-center">
          <CodeXml size={40} className="text-teal-300 mb-3 mx-auto " />

          <h1 className="text-3xl md:text-5xl leading-17  animate-topIn ani-delay-0.2 opacity-0 font-semibold">
            <span className="text-6xl">
              PHM, <span className="text-teal-300">FRONT</span>
            </span>
            ,<br></br> WEB DEVELOPER
          </h1>
          <p className="text-white/70 text-sm   leading-relaxed py-7 animate-topIn ani-delay-0.3 opacity-0 mx-auto md:mx-0">
            전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>
            트랜디 한 기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.{" "}
            <br></br>
          </p>

          <Button className="bg-white text-black animate-topIn ani-delay-0.4 opacity-0 p-5 px-7!">
            ABOUT ME <ArrowRightFromLine />
          </Button>

          {/* <Button variant={"ghost"} className="border rounded-full">
            About me <ArrowRight />
          </Button> */}
          {/* <div className="flex gap-2   mx-auto justify-center animate-topIn ani-delay-0.4 opacity-0">
            <Button
              className="rounded-full  hover:bg-white/10 border border-white/10 bg-white/2 text-xs hover:border-indigo-300/30 transition-all duration-300 group"
              variant={"ghost"}
              onClick={() => window.open("https://open.kakao.com/o/sq4skkTf")}
            >
              <Kakao className="fill-foreground opacity-50 group-hover:opacity-100  group-hover:fill-indigo-200 transition-all" />{" "}
              kakao
            </Button>
            <Button
              className="rounded-full   hover:bg-white/10 border border-white/10 bg-white/2 text-xs hover:border-indigo-300/30 transition-all duration-300 group"
              variant={"ghost"}
              onClick={() => window.open("https://github.com/phm6530/")}
            >
              <GitSvg className="fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />{" "}
              git
            </Button>
            <Button
              className="rounded-full  hover:bg-white/10 border border-white/10 bg-white/2 text-xs hover:border-indigo-300/30 transition-all duration-300 group"
              variant={"ghost"}
              onClick={() => window.open("https://blog.h-creations.com/")}
            >
              <BlogSvg className="fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />{" "}
              blog
            </Button>
          </div> */}
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10">
          <div className="space-y-2  animate-topIn ani-delay-0.5 opacity-0">
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer  pb-2 border-indigo-50/30 border-b">
              <span className="flex gap-2 text-[11px] text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                RECENT PROJECT
              </span>
              <ChevronRight
                size={15}
                className="opacity-50 ml-auto group-hover:opacity-100 transition-all text-indigo-200"
              />
            </h3>

            <RecentProject />
          </div>

          <div className="space-y-2  animate-topIn ani-delay-0.6 opacity-0">
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer   pb-2 border-indigo-50/30 border-b">
              <span className="flex gap-2 text-[11px] text text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]">
                RECENT POSTS
              </span>
              <ChevronRight
                size={15}
                className="opacity-50 ml-auto group-hover:opacity-100 transition-all text-indigo-200"
              />
            </h3>

            <RecentPosts />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
