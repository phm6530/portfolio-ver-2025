import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import useMediaQuery, { BREAKPOINT } from "@/hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(spanRefs.current, {
      stagger: 0.05,
      y: 50,

      opacity: 0,
      ease: "back(3)",
    });
  }, {});

  // const MY_LINKS = [
  //   {
  //     to: "https://open.kakao.com/o/sq4skkTf",
  //     svg: Kakao,
  //     label: "오픈 카카오톡",
  //   },
  //   {
  //     to: "https://github.com/phm6530/",
  //     svg: GitSvg,
  //     label: "git",
  //   },
  //   {
  //     to: "https://blog.h-creations.com/",
  //     svg: BlogSvg,
  //     label: "개인 블로그",
  //   },
  // ];

  const MAIN_BTN = [
    {
      name: "About",
      des: "퍼블리셔와 프론트엔드 그 사이 어딘가",
    },
    {
      name: "Work",
      des: "Project, ARCHIVE",
    },
    {
      name: "Blog",
      des: "Tech Archive code, 개발, 그리고 기술에 관한 기록 공간 입니다",
    },
    {
      name: "Board",
      des: "한줄의 응원은 힘이 됩니다",
    },
  ];
  return (
    <>
      <div className="absolute left-10 top-0 z-10 h-screen flex flex-col justify-center items-center">
        {/* {MY_LINKS.map((btn) => {
          return (
            <TooltipProvider key={`:links${btn.label}`}>
              <Tooltip>
                <TooltipTrigger>
                  <button className=" p-3 " onClick={() => window.open(btn.to)}>
                    <div className="relative">
                      <btn.svg className="size-3.5 fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
                      <div className="absolute -inset-1 scale-0 group-hover:scale-100 bg-indigo-400/20 blur-md rounded-full -z-10 transition-all duration-300"></div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-indigo-500 before:bg-indigo-500! after:bg-indigo-500!">
                  <p>{btn.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })} */}
      </div>
      {/* Main Bg */}
      <div className="w-screen relative overflow-hidden ">
        <div
          className=" absolute inset-0
                 bg-gradient-to-t from-black via-transparent to-black bottom-0 box-border w-full h-full z-5"
        />
        <div className="  items-start gap-3   textContainer w-full">
          <div
            data-speed="0.5"
            className="absolute left-0 inset-0 bg-bottom bg-no-repeat pointer-events-none"
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
              className="video-element w-full h-full object-cover"
            >
              <source src="/main_2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="layout-center  min-h-screen  justify-center flex flex-col ">
          <p className="text-sm z-10 text-teal-300 pt-40 mb-2 font-Montserrat">
            FRONT-END & PUBLISHER
          </p>
          <h1 className="inline-block bg-gradient-to-r  from-pink-500 to-pink-200 bg-clip-text text-transparentinline-block  text-5xl z-10 md:text-6xl leading-15 md:leading-20  font-Montserrat  break-keep  w-full">
            PHM,
            {"FRONTEND".split("").map((e, i) => (
              <span
                ref={(el) => {
                  if (el) {
                    spanRefs.current[i] = el;
                  }
                }}
                className="relative inline-block  font-bold"
              >
                {e}
              </span>
            ))}
            <br></br>
            DEVELOPER
          </h1>
          {/* <button
            className=" border border-border text-white  gsap-contents z-10 p-3 pl-5  justify-between gap-15 flex items-center text-xs article-hover  "
            onClick={() => nav("/about")}
          >
            ABOUT ME <ChevronRight size={12} />
          </button> */}
          <p className="z-10 opacity-70 mt-10 mb-15">
            해당 사이트는 'React'와 'Supabase'로 제작되었습니다.
          </p>{" "}
          {/* <div className="flex z-10 gap-2">
            {MY_LINKS.map((btn) => {
              return (
                <TooltipProvider key={`:links${btn.label}`}>
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        className=" p-3 "
                        onClick={() => window.open(btn.to)}
                      >
                        <div className="relative">
                          <btn.svg className="size-3.5 fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
                          <div className="absolute -inset-1 scale-0 group-hover:scale-100 bg-indigo-400/20 blur-md rounded-full -z-10 transition-all duration-300"></div>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-indigo-500 before:bg-indigo-500! after:bg-indigo-500!">
                      <p>{btn.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div> */}
          <div className="button   z-10  border-white/20 w-full  space-x-10 grid md:grid-cols-4 grid-cols-2">
            {MAIN_BTN.map((e, idx) => {
              return (
                <div className=" flex flex-col gap-2 pb-5 group cursor-pointer">
                  <h1 className="text-4xl  font-semibold font-Montserrat opacity-20 border-l pl-3">
                    0{idx + 1}
                  </h1>
                  <h1 className="font-Montserrat text-2xl border-l pl-3 group-hover:text-teal-300 group-hover:pl-5 transition-all r">
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
      {/* <div className="bg-black">
        <div className="layout-center p-5 bg-zinc-600/20 rounded-xl">
          <h1>
            저는 Front-End,<br></br>퍼블리셔에서 프론트엔드로 전환이 아닌 역량의
            확장이라는 생각으로 디자인과 기술을 아우르는 하이브리드 전문가로
            성장하고 있습니다. 사용자 중심의 직관적인 인터페이스 설계부터 최적화
            방식으로 개발자와 사용자 모두의 경험을 중시합니다.
          </h1>
        </div>
      </div> */}

      <div className="bg-white">
        <div className="layout-center py-25 grid md:grid-cols-[auto_1fr] gap-20">
          <div className="text-zinc-900 font-Montserrat text-4xl">ABOUT ME</div>
          <div className="flex flex-col gap-5">
            <p className="text-zinc-700">
              저는 프론트엔드 개발자 'PHM'입니다. <br></br>
              'Next.js', 'React'를 주력으로 개발하고 있으며 넓은 협업과 이해를
              위해 백엔드,
            </p>
            <p className="text-zinc-700">
              디자이너와 개발자 사이의 가교 역할을 수행하며, 복잡한 기술적
              요구사항을 시각적으로 뛰어난 결과물로 구현하는 독보적인 역량을
              바탕으로 팀과 프로젝트에 기여하겠습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 ">
        <RecentProject />
      </div>
      <div className="bg-zinc-900 ">
        <RecentPosts />
      </div>
    </>
  );
};

export default Home;
