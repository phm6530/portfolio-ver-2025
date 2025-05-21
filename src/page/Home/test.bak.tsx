import BackgroundImgCover from "@/components/ui/BackgroundImgCover";
import ShootingStar from "@/components/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import Cubes from "@/asset/shape.svg?react";
import {
  LucideCurlyBraces,
  Milestone,
  Box,
  BoxSelect,
  CurlyBraces,
  ClipboardSignature,
  Boxes,
  Figma,
  FormInput,
  CuboidIcon,
  PenBox,
  MessageCircleDashed,
} from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import StarAnimation from "@/components/animations/StarAnimation";
import StackEffect from "./components/stack-effect";
import TextGradentAnimation from "@/components/animations/text-gradient";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import LinksWiget from "@/components/shared/link-wiget";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  useGSAP(() => {}, { scope: "" });

  return (
    <main
      ref={ref}
      className={`md:min-h-screen animate-opacity text-white overflow-hidden relative flex justify-center dark:bg-zinc-900 bg-zinc-50`}
      // style={{
      //   backgroundImage: "url(/vanner/vanner_3.jpg)",
      //   backgroundPosition: "center bottom",
      //   backgroundAttachment: "fixed",
      // }}
    >
      {/* <StarAnimation /> */}
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
      {/* <div className=" w-full absolute h-[400px] top-[200px]">
        <StackEffect />
      </div> */}{" "}
      {/* <div
          className={`glow-5 z-0! absolute top-[50%] left-[50%] -translate-y-[70%]  size-1/3 bg-gradient-to-l to-red-500/30 via-indigo-500/50 from-red-500/60 blur-[100px] rounded-full transition-colors duration-700`}
        /> */}
      <div className="layout-center grid grid-cols-[auto_1fr]  pt-30 gap-20">
        {/* <div
            className="border p-5 min-h-[250px] border-border bg-cover bg-bottom rounded-xl"
            style={{
              backgroundImage: "url(/vanner/vanner_4.jpg)",
            }}
          ></div> */}

        <div className="flex flex-col items-start gap-3 animate-leftIn ani-delay-0.1 opacity-0 sticky top-30 transition-all textContainer">
          {/* <UserCheck2 className="size-9 text-teal-300" /> */}
          <h1 className="text-4xl leading-12">
            PHM, <br></br>
            <span className="text-teal-300">FRONTEND</span>
            <br></br>
            DEVELOPER
          </h1>

          <p className="md:max-w-[300px] mt-5 text-foreground/70 text-sm   leading-relaxed  animate-topIn ani-delay-0.3">
            전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>
            트랜디 한 기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.{" "}
            <br></br>
          </p>

          <button className="border p-3 mt-4 w-full justify-between gap-2 flex items-center text-xs border-border">
            ABOUT ME <ChevronRight size={12} />
          </button>

          <LinksWiget />
        </div>

        <div className="grid  gap-10 pb-20">
          <div className="grid grid-cols-4 gap-2">
            <div className="border flex flex-col article-hover p-5 rounded-xl">
              <div className="size-10  flex items-center justify-center ">
                <UserCheck2 className="size-16 text-teal-300" />
              </div>
              <span className="text-2xl mt-5 ml-auto inline-block">About</span>
              <span className="text-xs ml-auto text-muted-foreground">
                저를 소개합니다
              </span>
            </div>
            <div className="border flex flex-col article-hover p-5 rounded-xl">
              <div className="size-10  flex items-center justify-center ">
                <Box className="size-16 text-teal-300" />
              </div>
              <span className="text-2xl mt-5 ml-auto inline-block">
                Project
              </span>
              <span className="text-xs ml-auto text-muted-foreground">
                Work archive
              </span>
            </div>
            <div className="border flex flex-col article-hover p-5 rounded-xl">
              <div className="size-10  flex items-center justify-center ">
                <PenBox className="size-16 text-teal-300" />
              </div>
              <span className="text-2xl mt-5 ml-auto inline-block">Blog</span>
              <span className="text-xs ml-auto text-muted-foreground">
                기술 블로그
              </span>
            </div>
            <div className="border flex flex-col article-hover p-5 rounded-xl">
              <div className="size-10  flex items-center justify-center ">
                <MessageCircleDashed className="size-16 text-teal-300" />
              </div>
              <span className="text-2xl mt-5 ml-auto inline-block">Board</span>
              <span className="text-xs ml-auto text-muted-foreground">
                방명록
              </span>
            </div>
          </div>
          {/* <div>
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer   pb-2  ">
              <Milestone size={20} />
              <span className="flex gap-2 text-[11px] text text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]  text-foreground/80">
                Pinned
              </span>
              <ChevronRight
                size={15}
                className="opacity-50 ml-auto group-hover:opacity-100 transition-all text-foreground/30"
              />
            </h3>
            <div className="border min-h-[200px] rounded-2xl"></div>
          </div> */}
          <div className=" animate-topIn ani-delay-0.5 opacity-0">
            <h3 className=" text-sm font-medium tracking-wider  flex items-center gap-2 group cursor-pointer  pb-2 ">
              <Box size={20} />
              <span className="flex gap-2 text-[11px] text-shadow-[0_5px_30px_rgba(99,102,241,0.25)] text-foreground/80">
                최근 프로젝트
              </span>
              <ChevronRight
                size={15}
                className="opacity-50 ml-auto group-hover:opacity-100 transition-all text-foreground/30"
              />
            </h3>

            <RecentProject />
          </div>

          <div className="space-y-2  animate-topIn ani-delay-0.6 opacity-0">
            <h3 className="text-sm font-medium tracking-wider mb-3 flex items-center gap-2 group cursor-pointer   pb-2  ">
              <Milestone size={20} />
              <span className="flex gap-2 text-[11px] text text-shadow-[0_5px_30px_rgba(99,102,241,0.25)]  text-foreground/80">
                최근 포스팅
              </span>
              <ChevronRight
                size={15}
                className="opacity-50 ml-auto group-hover:opacity-100 transition-all text-foreground/30"
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
