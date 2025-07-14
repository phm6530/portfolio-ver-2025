import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./hero";
import HomeAbout from "./home-about";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const nav = useNavigate();

  const mainRef = useRef<HTMLDivElement>(null);
  const secRefs = useRef<HTMLElement[]>([]);
  const [page, setPage] = useState(0);
  const SECTION_DURATION = 900;
  const scrollingRef = useRef<boolean>(false);
  const isResizing = useRef<NodeJS.Timeout | null>(null);

  // body styled 제거
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const pageMoveHandler = (targetPage: number) => {
    scrollingRef.current = true; // 상태

    // 이전 페이지와 비교하여 방향 결정
    const isMovingDown = targetPage > page;
    const isMovingUp = targetPage < page;

    gsap.utils.toArray(secRefs.current).forEach((sec, idx) => {
      const tl = gsap.timeline();
      const doms = (sec as HTMLElement).querySelectorAll("[data-animate]");

      if (idx <= targetPage) {
        tl.to(sec as HTMLElement, {
          y: 0,
          ease: "power3.inOut",
          duration: SECTION_DURATION / 1000,
          delay: idx * 0.1,
        });

        doms.forEach((el, conIdx) => {
          if (idx === targetPage) {
            // 현재 활성 섹션의 애니메이션
            const startY = isMovingDown ? 50 : isMovingUp ? -50 : 0;

            gsap.fromTo(
              el,
              {
                opacity: 0,
                y: startY,
              },
              {
                opacity: 1,
                y: 0,
                delay: 0.8 + conIdx * 0.03,
                duration: 0.6,
                ease: "power3.out",
              }
            );
          } else {
            // 이전 섹션들은 페이드아웃
            gsap.to(el, {
              opacity: 0,
              y: -20,
              delay: conIdx * 0.03,
              duration: 0.3,
              ease: "power3.inOut",
            });
          }
        });
      } else {
        // 아래 섹션들은 화면 밖으로
        gsap.to(sec as HTMLElement, {
          y: window.innerHeight,
          ease: "expo.inOut",
          duration: SECTION_DURATION / 1000,
          delay: idx * 0.1,
        });

        doms.forEach((el) => {
          gsap.to(el, {
            opacity: 0,
            y: 50,
            delay: 0,
            duration: 0.4,
            ease: "power3.inOut",
          });
        });
      }
    });

    setTimeout(() => {
      scrollingRef.current = false; // 종료 시키기
    }, SECTION_DURATION);
  };

  // wheel Handler
  useEffect(() => {
    const wheelEvent = (e: WheelEvent) => {
      if (scrollingRef.current) return; // 스크롤 중일땐 리턴시키고

      // 해당섹션이 콘텐츠가 넘을 때는 잠시 일단 중지
      const currentSection = secRefs.current[page];

      const scrollHeight = currentSection.scrollHeight;
      const clientHeight = currentSection.clientHeight;
      const scrollTop = currentSection.scrollTop;

      // over 되는지 확인
      const isOverflowSection = scrollHeight > clientHeight;
      const isBottom = scrollHeight - 1 <= clientHeight + scrollTop;
      const isAtTop = scrollTop <= 0;

      if (isOverflowSection) {
        if (e.deltaY > 0 && secRefs.current.length - 1 > page && isBottom) {
          const nextPage = page + 1;
          setPage(nextPage);
          pageMoveHandler(nextPage);
        } else if (!(page <= 0) && e.deltaY < 0 && isAtTop) {
          const prevPage = page - 1;
          setPage(prevPage);
          pageMoveHandler(prevPage);
        }
      } else {
        if (e.deltaY > 0 && secRefs.current.length - 1 > page) {
          const nextPage = page + 1;
          setPage(nextPage);
          pageMoveHandler(nextPage);
        } else if (!(page <= 0) && e.deltaY < 0) {
          const prevPage = page - 1;
          setPage(prevPage);
          pageMoveHandler(prevPage);
        }
      }
    };

    window.addEventListener("wheel", wheelEvent, { passive: false });
    return () => {
      window.removeEventListener("wheel", wheelEvent);
    };
  }, [page]);

  // Resize 대응
  useEffect(() => {
    const handleResize = () => {
      if (isResizing.current) {
        clearTimeout(isResizing.current);
      }
      isResizing.current = setTimeout(() => {
        gsap.utils.toArray(secRefs.current).forEach((sec, idx) => {
          if (idx <= page) {
            gsap.set(sec as HTMLElement, { y: 0 });
          } else {
            gsap.set(sec as HTMLElement, { y: window.innerHeight });
          }
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (isResizing.current) {
        clearTimeout(isResizing.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [page]);

  // inital set
  useGSAP(
    () => {
      gsap.utils.toArray(secRefs.current).forEach((e, idx) => {
        if (idx !== 0) {
          gsap.set(e as HTMLElement, { y: window.innerHeight });
        }
      });
    },
    { scope: mainRef, dependencies: [secRefs.current] }
  );

  return (
    <main ref={mainRef} className="min-h-screen relative">
      {/* Hero - main */}
      <HeroSection ref={secRefs} />

      {/* About */}
      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current.push(el);
          }
        }}
        className="h-screen flex flex-col justify-center items-center  bg-zinc-900 z-11 w-screen absolute overflow-y-auto"
      >
        <HomeAbout />
      </section>

      {/* Project */}
      <section
        style={{
          backgroundImage: `
linear-gradient(#1d191ccc, rgb(24 22 22 / 75%)), url(/img/keyboard_7.jpg)
    `,
          backgroundSize: "cover",
          backgroundPosition: "bottom 200px",
          // filter: "grayscale(100%)",
        }}
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current.push(el);
          }
        }}
        className="h-screen flex bg-bottom flex-col bg-cover items-center justify-start bg-zinc-950  z-11 w-screen absolute overflow-y-auto"
      >
        <RecentProject />
      </section>

      {/* Blog */}
      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current.push(el);
          }
        }}
        className="h-screen flex flex-col items-center justify-start bg-zinc-50  z-11 w-screen absolute overflow-y-auto"
      >
        <RecentPosts />
      </section>

      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current.push(el);
          }
        }}
        className="h-screen flex items-center justify-center bg-lime-800 z-14 w-screen absolute"
      >
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Section 5 (Footer)</h1>
          <p className="text-white/60">마지막 섹션입니다</p>
        </div>
      </section>

      {/* 페이지 인디케이터 */}
      <div className="fixed right-8 top-1/2 z-50">
        {Array.from({ length: 5 }, (_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full mb-2 cursor-pointer transition-all duration-300 ${
              idx === page ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => {
              setPage(idx);
              pageMoveHandler(idx);
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
