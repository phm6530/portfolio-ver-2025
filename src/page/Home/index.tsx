import { Milestone } from "lucide-react";
import { ChevronRight, UserCheck2 } from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import useMediaQuery, { BREAKPOINT } from "@/hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const parentsRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  const nav = useNavigate();

  useGSAP(() => {
    gsap.to(ref.current, {
      filter: "blur(10px)",
      opacity: 0,
      y: 100,

      scrollTrigger: {
        trigger: parentsRef.current,
        scrub: 0.8,
        // markers: true,
        start: "47% center",
      },
    });
  }, {});

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(spanRefs.current, {
      stagger: 0.05,
      y: 50,

      opacity: 0,
      ease: "back(3)",
    });
  }, {});

  return (
    <>
      <div className="layout-center  pt-30 gap-20 " ref={parentsRef}>
        <div
          ref={ref}
          className="flex flex-col items-start gap-3  mt-30 mb-10 textContainer w-full"
        >
          <UserCheck2 className="size-9 text-teal-300" />

          <h1 className="text-5xl md:text-6xl leading-15 md:leading-20 font-semibold  break-keep  w-full">
            PHM,
            {"FRONTEND".split("").map((e, i) => (
              <span
                ref={(el) => {
                  if (el) {
                    spanRefs.current[i] = el;
                  }
                }}
                className="text-teal-200 relative inline-block"
              >
                {e}
              </span>
            ))}
            <br></br>
            DEVELOPER
          </h1>

          <p className="mt-5  text-sm md:text-base leading-relaxed gsap-contents">
            전문성 있는 프론트엔드 개발자로 성장하고자 합니다. <br></br>
            트랜디 한 기술을 파악하고, 익숙해지는 것에 전념하고 있습니다.{" "}
            <br></br>
          </p>

          <button
            className="gsap-contents border p-4 pl-5 mt-4  justify-between gap-15 flex items-center text-xs article-hover rounded-full "
            onClick={() => nav("/about")}
          >
            ABOUT ME <ChevronRight size={12} />
          </button>

          {/* <LinksWiget /> */}
        </div>

        <div className="flex flex-col gap-10 pb-20 pt-10  z-10">
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
    </>
  );
};

export default Home;
