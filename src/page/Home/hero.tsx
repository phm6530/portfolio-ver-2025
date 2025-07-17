import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/utils";
gsap.registerPlugin(CustomEase);
CustomEase.create("myBezier", "0,0.45,0,0.62");

const MAIN_BTN = [
  {
    name: "About",
    des: "퍼블리셔와 프론트엔드\n 그 사이 어딘가",
    path: "/about",
  },
  {
    name: "Work",
    des: "Project ARCHIVE,\n 저의 작업 리스트 입니다.",
    path: "/project",
  },
  {
    name: "Blog",
    des: "개발, 그리고 기술에 관한\n기록 공간 입니다",
    path: "/blog",
  },
  {
    name: "Board",
    des: "방명록' 여러분의 한줄의 응원은\n저에게 큰 힘이 됩니다",
    path: "/board",
  },
];

const HeroSection = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();
  // Select
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        spanRefs.current,
        { y: 50, opacity: 0 },
        {
          delay: 0.4,
          stagger: 0.05,
          y: 0,
          opacity: 1,
          color: "#46edd5",
          ease: "back(3)",
        }
      );
    },
    { dependencies: [spanRefs] }
  );

  return (
    <>
      {/* overlay */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          height: "100vh",
          width: "100vw",
        }}
        className="video-element w-screen h-screen object-cover block fixed "
      >
        {/* Neon */}
        <source src="/neon_5.mp4" type="video/mp4" />
      </video>

      <section
        // Page 기준
        ref={(el) => {
          if (el) {
            // forwardRef로 받은 ref가 배열 ref라면
            if (ref && "current" in ref) {
              const arrayRef = ref.current!;
              if (!arrayRef.includes(el)) {
                arrayRef.push(el);
              }
            }
          }
        }}
        className="h-screen absolute w-full"
      >
        {/* overlay */}
        <div
          ref={overlayRef}
          className="absolute bottom-0  z-2
                 w-full h-1/2 box-border bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"
        />

        {/* 레퍼 분리 */}
        <div
          data-sec
          className=" h-screen flex z-2 flex-col absolute top-0  items-center pt-50 md:pt-30 md:pb-0 pb-20 justify-center  w-screen  overflow-y-auto util-scrollbar"
        >
          <div className="layout-center md:grid  relative  md:justify-end pt-45 md:pt-0">
            <div className="animate-topIn ani-delay-0.1 opacity-0 leading-relaxed text-center md:text-right   justify-center flex flex-col items-end ">
              <p
                data-animate
                className="text-xs md:text-sm z-10  leading-relaxed text-teal-300  mb-2 font-Montserrat mx-auto md:mx-0"
              >
                프론트엔드 & 퍼블리셔
              </p>
              <h1
                data-animate
                className="inline-block leading-tight text-[45px] z-10 md:text-6xl    font-Montserrat!  break-keep  w-full"
              >
                PHM,
                <div className="inline-block">
                  {"FRONTEND".split("").map((e, i) => (
                    <span
                      key={`word:${i}`}
                      ref={(el) => {
                        if (el) {
                          spanRefs.current[i] = el;
                        }
                      }}
                      className="relative inline-block font-bold font-Montserrat hover:text-teal-300 transition-colors duration-300"
                      style={{
                        textShadow: "0 0 30px rgba(45, 212, 191, 0.3)",
                      }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <br></br>
                DEVELOPER
              </h1>

              <p
                data-animate
                className="z-10 text-sm md:text-base w-full opacity-80 mt-10 md:mb-25 leading-relaxed border-border pb-5"
              >
                프론트앤드 개발과 퍼블리싱을 주로 다룹니다<br></br> 해당
                사이트는
                <span className="text-indigo-300">'React'</span>와 'Supabase'로
                제작되었습니다.
              </p>
            </div>{" "}
            <div className="animate-topIn opacity-0  ani-delay-0.3 z-10 pt-20 md:pt-0 grid gap-2 grid-cols-2 md:grid-cols-4  text-right ">
              {MAIN_BTN.map((e, idx) => {
                return (
                  <div
                    data-animate
                    key={`btn:${e.name}`}
                    onClick={() => nav(e.path)}
                    style={{
                      backdropFilter: "blur(5px)",
                    }}
                    className={cn(
                      "p-5  rounded-xl  grid   gap-1  group cursor-pointer bg-zinc-50/5"
                    )}
                  >
                    <div className="items-center flex gap-10 justify-between">
                      <h1 className="text-4xl group-hover:opacity-100 group-hover:text-teal-200 transition-all md:text-3xl shadow-2xl text-shadow-black font-semibold font-Montserrat opacity-40   ">
                        0{idx + 1}
                      </h1>{" "}
                      <h1
                        className="font-Montserrat text-xl md:text-2xl   group-hover:text-teal-300 transition-all "
                        style={{ transition: "padding-left .2s ease" }}
                      >
                        {e.name}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p className=" text-xs text-muted-foreground transition-all group-hover:text-white  md:col-auto break-keep whitespace-pre-line leading-relaxed">
                        {e.des}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>{" "}
        </div>
      </section>
    </>
  );
});

export default HeroSection;
