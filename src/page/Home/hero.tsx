import gsap from "gsap";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/utils";
gsap.registerPlugin(CustomEase);
CustomEase.create("myBezier", "0,0.45,0,0.62");

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

const HeroSection = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();
  // Select
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (!isVideoLoaded) return;
    tl.to(progressRef.current, {
      width: "100%",
      delay: 0.8,
      ease: "expo.inOut",
      duration: 1.2,
      backgroundColor: "#46edd5",
    });

    tl.to(
      loadingRef.current,
      {
        y: "-100vh",
        delay: 0.4,
        ease: "expo.inOut",
        duration: 1.2,
      },
      "-=.5"
    );

    tl.fromTo(
      spanRefs.current,
      { y: 50, opacity: 0 },
      {
        stagger: 0.05,
        y: 0,
        opacity: 1,
        color: "#46edd5",
        ease: "back(3)",
      },
      "-=.5"
    );
  }, [isVideoLoaded]);

  return (
    <>
      {/* loading.. */}
      <div
        ref={loadingRef}
        className=" fixed inset-0  bg-zinc-900 z-10 flex flex-col gap-2 justify-center items-center"
      >
        <span className="tracking-wider">loading....</span>

        {/* progress */}
        <div className="flex max-w-[100px] h-1 overflow-hidden rounded-full bg-zinc-50/10 w-full">
          <span
            ref={progressRef}
            className="w-1 inline-block bg-white h-full"
          ></span>
        </div>
      </div>

      {/* overlay */}
      <img
        // ❗️ 여기에 사용할 이미지 경로를 입력하세요.
        src="/placeholder-image.jpg"
        alt="Loading video background"
        className={cn(
          "absolute w-full h-full object-cover transition-opacity duration-1000",
          // 비디오가 로드되면 투명하게 만듭니다.
          isVideoLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* 비디오 요소 */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        onLoadedData={() => setIsVideoLoaded(true)}
        playsInline
        className={cn(
          "video-element w-screen h-screen object-cover block fixed",
          // 비디오가 로드되면 불투명하게 만듭니다.
          isVideoLoaded ? "opacity-100" : "opacity-0"
        )}
      >
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
        className="w-screen absolute "
      >
        {/* overlay */}
        <div
          ref={overlayRef}
          className="absolute bottom-0  
                 w-full h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent z-2 pointer-events-none"
        />
        {/* 레퍼 분리 */}
        <div
          data-sec
          className=" util-h-screen flex z-2 flex-col absolute top-0  items-center pt-10 md:pt-30 md:pb-0  md:justify-center  w-screen  overflow-y-auto util-scrollbar"
        >
          <div className="layout-center md:grid  relative  md:justify-end pt-45  md:pt-0">
            <div className=" leading-relaxed text-center md:text-right    flex flex-col items-end ">
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
            <div className="pb-30 md:pb-0 md:mx-0  z-10 pt-20 md:pt-0 grid md:gap-0 grid-cols-1   md:grid-cols-4  md:text-right ">
              {MAIN_BTN.map((e, idx) => {
                return (
                  <div
                    data-animate
                    key={`btn:${e.name}`}
                    onClick={() => nav(e.path)}
                    className={cn(
                      "border-b py-3 md:px-5  md:border-0  rounded-xl md:rounded-none border-border  grid md:border-r   gap-1  group cursor-pointer  md:bg-transparent"
                    )}
                  >
                    <div className="items-center flex gap-4 md:gap-10 justify-between">
                      <h1 className="text-2xl md:text-4xl group-hover:opacity-100 group-hover:text-teal-200 transition-all  shadow-2xl text-shadow-black font-semibold font-Montserrat opacity-40   ">
                        0{idx + 1}
                      </h1>{" "}
                      <h1 className="font-Montserrat text-xl md:text-2xl   group-hover:text-teal-300 transition-all ">
                        {e.name}
                      </h1>
                    </div>
                    <div className="flex flex-col gap-5">
                      <p className="text-right text-xs text-muted-foreground transition-all group-hover:text-white  md:col-auto break-keep whitespace-pre-line leading-relaxed">
                        {e.des}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default HeroSection;
