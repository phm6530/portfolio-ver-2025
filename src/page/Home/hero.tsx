import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CustomEase } from "gsap/CustomEase";
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

      // tl.add(
      //   [
      //     gsap.fromTo(
      //       videoRef.current,
      //       { opacity: 0 },
      //       { opacity: 1, duration: 0.5, ease: "sine.out", delay: 0.3 }
      //     ),
      //     gsap.fromTo(
      //       videoRef.current,
      //       { scale: 1 },
      //       {
      //         delay: 0.3,
      //         scale: 1.4,
      //         duration: 5,
      //         ease: "myBezier",
      //       }
      //     ),
      //   ],
      //   0
      // );

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
      <div
        ref={overlayRef}
        className="absolute top-0  z-10
                 w-full h-full box-border bg-gradient-to-b from-zinc-950 via-black/20 to-transparent"
        // style={{
        //   backdropFilter: "blur(5px)",
        // }}
      />

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
        className="video-element w-full h-full object-cover block fixed "
      >
        {/* Neon */}
        <source src="/neon_5.mp4" type="video/mp4" />
      </video>

      <section
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
        className="h-screen  flex flex-col items-center pt-60 md:pt-30 md:pb-0 pb-20 justify-center z-11 w-screen absolute overflow-y-auto"
      >
        <div className="layout-center grid justify-end ">
          <div className=" leading-relaxed text-right   justify-center flex flex-col items-end ">
            <p
              data-animate
              className="text-sm z-10  leading-relaxed text-teal-300  mb-2 font-Montserrat"
            >
              프론트엔드 & 퍼블리셔
            </p>
            <h1
              data-animate
              className="inline-block leading-tight text-4xl z-10 md:text-6xl    font-Montserrat!  break-keep  w-full"
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
              className="z-10 text-sm md:text-base opacity-80 my-10 md:mb-25 leading-relaxed border-b border-border pb-5"
            >
              프론트앤드 개발과 퍼블리싱을 주로 다룹니다<br></br> 해당 사이트는
              <span className="text-indigo-300">'React'</span>와 'Supabase'로
              제작되었습니다.
            </p>
          </div>

          <div className="button   z-10 gap-4  w-full  space-x-10 grid grid-cols-4 text-right">
            {MAIN_BTN.map((e, idx) => {
              return (
                <div
                  data-animate
                  key={`btn:${e.name}`}
                  onClick={() => nav(e.path)}
                  className="border-r border-white/30 pr-5 grid grid-cols-[auto_1fr] md:grid-cols-1  gap-5 md:gap-2  group cursor-pointer"
                >
                  <div className="flex gap-2 justify-between items-center">
                    <h1 className="text-4xl md:text-4xl  font-semibold font-Montserrat opacity-20 md:pl-3">
                      0{idx + 1}
                    </h1>
                    <h1
                      className="font-Montserrat text-xl md:text-2xl   group-hover:text-teal-300  "
                      style={{ transition: "padding-left .2s ease" }}
                    >
                      {e.name}
                    </h1>
                  </div>{" "}
                  <p className=" text-xs text-muted-foreground  md:col-auto break-keep whitespace-pre-line leading-relaxed">
                    {e.des}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
});

export default HeroSection;
