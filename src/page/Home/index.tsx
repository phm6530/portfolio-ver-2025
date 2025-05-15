import { Milestone } from "lucide-react";
import { ChevronRight, UserCheck2 } from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMediaQuery, { BREAKPOINT } from "@/hooks/useMediaQuery";
gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  const isDesktop = useMediaQuery(`(min-width:${BREAKPOINT.MD}px)`);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        ease: "sine.inout",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom",
          scrub: 3,
        },
      });

      tl.to(ref.current, {
        ...(isDesktop
          ? { backgroundPositionY: 100 }
          : { backgroundPositionX: 100 }),
      });
    },
    { scope: ref, dependencies: [isDesktop] }
  );

  return (
    <main
      ref={ref}
      className={`md:min-h-screen  text-white bg-fixed overflow-hidden relative flex justify-center dark:bg-zinc-900 bg-zinc-50   `}
      style={{
        backgroundImage: "url(/img/v1.jpg)",

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
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
      </div> */}
      {/* <div
        className={`glow-5 z-0! pointer-events-none absolute top-[50%] left-[50%] -translate-y-[70%]  size-1/3 bg-gradient-to-l to-red-500/30 via-indigo-500/50 from-red-500/30 blur-[100px] rounded-full transition-colors duration-700`}
      /> */}
      <div className="layout-center   pt-30 gap-20">
        {/* <div
            className="border p-5 min-h-[250px] border-border bg-cover bg-bottom rounded-xl"
            style={{
              backgroundImage: "url(/vanner/vanner_4.jpg)",
            }}
          ></div> */}

        <div className="flex flex-col items-start gap-3  mt-30 mb-10 transition-all textContainer w-full">
          <UserCheck2 className="size-9 text-teal-300" />
          <h1 className="text-5xl md:text-6xl leading-15 md:leading-17 font-semibold  animate-leftIn ani-delay-0.1 opacity-0 break-keep  w-full">
            PHM,
            <span className="text-teal-200 relative inline-block">
              FRONTEND
              {/* <span
                ref={lineRef}
                className="inline-block  h-1 bg-gradient-to-l to-teal-200  absolute bottom-3 left-0"
              ></span> */}
            </span>
            <br></br>
            DEVELOPER
          </h1>

          <p className="mt-5 text-foreground/70 text-sm md:text-base   leading-relaxed  animate-leftIn ani-delay-0.2 opacity-0 ">
            전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>
            트랜디 한 기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.{" "}
            <br></br>
          </p>

          <button
            className="border p-3 mt-4 animate-leftIn ani-delay-0.3 opacity-0  justify-between gap-15 flex items-center text-xs article-hover rounded-full border-indigo-200"
            onClick={() => nav("/about")}
          >
            ABOUT ME <ChevronRight size={12} />
          </button>

          {/* <LinksWiget /> */}
        </div>

        <div className="flex flex-col gap-10 pb-20 pt-10">
          <div className=" animate-topIn ani-delay-0.5 opacity-0">
            <h3 className=" text-sm font-medium tracking-wider  flex items-center gap-2 group cursor-pointer  pb-2 ">
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

          <div className="space-y-2 mt-5  animate-topIn ani-delay-0.6 opacity-0">
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
