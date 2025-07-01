import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import useMediaQuery, { BREAKPOINT } from "@/hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(spanRefs.current, {
      stagger: 0.05,
      y: 50,

      opacity: 0,
      ease: "back(3)",
    });
  }, {});

  useGSAP(() => {
    gsap.to(ref.current, {
      y: 300,
      scrollTrigger: {
        trigger: "",
        scrub: 1,
      },
    });
  }, {});

  const MY_LINKS = [
    {
      to: "https://open.kakao.com/o/sq4skkTf",
      svg: Kakao,
      label: "오픈 카카오톡",
    },
    {
      to: "https://github.com/phm6530/",
      svg: GitSvg,
      label: "git",
    },
    {
      to: "https://blog.h-creations.com/",
      svg: BlogSvg,
      label: "개인 블로그",
    },
  ];

  const MAIN_BTN = [
    {
      name: "About",
      des: "퍼블리셔와 프론트엔드 그 사이 어딘가",
      path: "/about",
    },
    {
      name: "Work",
      des: "Project ARCHIVE, 저의 작업 리스트 입니다.",
      path: "/project",
    },
    {
      name: "Blog",
      des: "개발, 그리고 기술에 관한 기록 공간 입니다",
      path: "/blog",
    },
    {
      name: "Board",
      des: "방명록' 여러분의 한줄의 응원은 저에게 큰 힘이 됩니다",
      path: "/board",
    },
  ];
  return (
    <>
      {/* Main Bg */}
      <div className="w-screen relative overflow-hidden ">
        {/* overlay */}
        <div
          className=" absolute  translate-y-1 
                 bg-gradient-to-t from-zinc-950 via-transparent to-transparent  box-border w-full h-full z-5"
        />
        <div className="  items-start gap-3   textContainer w-full  overflow-hidden box-border">
          <div
            ref={ref}
            className="absolute bg-bottom bg-no-repeat pointer-events-none"
            style={{
              width: "100vw",
              height: "100dvh", // 동적 뷰포트 높이
              minHeight: "100vh",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="video-element w-full h-full object-cover block" // block 추가
            >
              <source src="/main_2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="layout-center  min-h-screen  justify-center flex flex-col items-start">
          <p className="text-sm z-10 text-teal-300 pt-70 md:pt-40 mb-2 font-Montserrat">
            FRONT END - PUBLISHER
          </p>
          <h1 className="inline-block  text-5xl z-10 md:text-7xl  md:leading-tight  font-Montserrat  break-keep  w-full">
            PHM,
            {"FRONTEND".split("").map((e, i) => (
              <span
                ref={(el) => {
                  if (el) {
                    spanRefs.current[i] = el;
                  }
                }}
                className="relative inline-block  font-bold  "
              >
                {e}
              </span>
            ))}
            <br></br>
            DEVELOPER
          </h1>

          <p className="z-10 opacity-80 mt-10 mb-25">
            프론트앤드 개발과 퍼블리싱을 주로 다루빈다<br></br> 해당 사이트는
            'React'와 'Supabase'로 제작되었습니다.
          </p>

          <div className="button   z-10   w-full  space-x-10 grid md:grid-cols-4 grid-cols-2">
            {MAIN_BTN.map((e, idx) => {
              return (
                <div
                  onClick={() => navigate(e.path)}
                  className=" flex flex-col gap-2 pb-5 group cursor-pointer"
                >
                  <h1 className="text-4xl  font-semibold font-Montserrat opacity-20 border-l pl-3">
                    0{idx + 1}
                  </h1>
                  <h1
                    className="font-Montserrat text-2xl border-l pl-3 group-hover:text-teal-300 group-hover:pl-5 "
                    style={{ transition: "padding-left .2s ease" }}
                  >
                    {e.name}
                  </h1>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {e.des}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 -translate-y-1 pb-2 border-t-2 ">
        <div className="layout-center pt-30 pb-20 md:pb-40 grid md:grid-cols-[auto_1fr] gap-10 items-start">
          {/* 왼쪽 텍스트 영역 */}
          <div className="text-foreground font-Montserrat">
            <h1 className="text-4xl mb-4 flex items-center gap-2">
              ABOUT ME
              <span className="text-teal-400 text-xl">👋</span>
            </h1>
          </div>

          {/* 오른쪽 시각 요소 */}
          <div className="flex flex-col gap-6">
            <div className="text-base md:text-lg flex flex-col gap-5 leading-relaxed">
              <p className="break-keep">
                프론트엔드 개발자 <strong>‘PHM’</strong>입니다. <br />
                <span className="text-teal-300">Next.js</span>,{" "}
                <span className="text-teal-300">React</span>를 주력으로 개발하고
                있으며, 넓은 협업과 이해를 위해 새로 배우는 것에 흥미를
                느낍니다.
              </p>
              <p className="break-keep">
                퍼블리셔에서 프론트엔드로 전환이 아닌{" "}
                <strong>역량의 확장</strong>이라는 생각으로 디자인과 기술을
                아우르는 하이브리드 전문가로 성장하고 있습니다. 사용자 중심의
                직관적인 인터페이스 설계부터 최적화 방식으로 개발자와 사용자
                모두의 경험을 중시합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" pb-20 pt-10 bg-zinc-900 ">
        <RecentProject />
      </div>
      <div className="bg-zinc-950">
        <RecentPosts />
      </div>
    </>
  );
};

export default Home;
