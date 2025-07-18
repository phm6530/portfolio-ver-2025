import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroSection from "./hero";
import HomeAbout from "./home-about";
import HomeContact from "./home-contact";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const secRefs = useRef<HTMLElement[]>([]);
  const [page, setPage] = useState(0);
  const SECTION_DURATION = 800;
  const scrollingRef = useRef<boolean>(false);
  const isResizing = useRef<NodeJS.Timeout | null>(null);

  // body styled 제거
  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Home 컴포넌트 내부

  const touchStartRef = useRef(0); // 터치 시작 Y좌표를 저장할 ref
  const SWIPE_THRESHOLD = 50; // 최소 스와이프 거리 (px)

  // wheel Handler 및 touch Handler를 포함하는 useEffect
  useEffect(() => {
    const pageMoveHandler = (targetPage: number) => {
      scrollingRef.current = true; // 상태

      // 이전 페이지와 비교하여 방향 결정
      const isMovingDown = targetPage > page;
      const isMovingUp = targetPage < page;

      gsap.utils.toArray(secRefs.current).forEach((sec, idx) => {
        const tl = gsap.timeline();
        const doms = (sec as HTMLElement).querySelectorAll("[data-animate]");

        // Background
        // if (idx === targetPage) {
        //   const hasBg = (sec as HTMLElement).querySelector("[data-bg]");

        //   if (hasBg) {
        //     gsap.fromTo(
        //       hasBg,
        //       { scale: 1 },
        //       {
        //         scale: 1.3,
        //         duration: 8,
        //         ease: "sine",
        //         repeat: -1,
        //         yoyo: true,
        //       }
        //     );
        //   }
        // }

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
    // --- 공통 로직: 페이지 이동 함수 ---
    const goToNextPage = () => {
      if (scrollingRef.current || page >= secRefs.current.length - 1) return;
      const nextPage = page + 1;
      setPage(nextPage);
      pageMoveHandler(nextPage);
    };

    const goToPrevPage = () => {
      if (scrollingRef.current || page <= 0) return;
      const prevPage = page - 1;
      setPage(prevPage);
      pageMoveHandler(prevPage);
    };

    // --- 기존 wheel 이벤트 핸들러 (리팩토링) ---
    const wheelEvent = (e: WheelEvent) => {
      if (scrollingRef.current) return;

      const currentSection = secRefs.current[page];
      const sectionWrapper = currentSection.querySelector(
        "[data-sec]"
      ) as HTMLElement;
      const { scrollHeight, clientHeight, scrollTop } = sectionWrapper;
      const isOverflowSection = scrollHeight > clientHeight;
      const isBottom = scrollHeight - 1 <= clientHeight + scrollTop;
      const isAtTop = scrollTop <= 0;

      if (e.deltaY > 0) {
        // 아래로 스크롤
        if (isOverflowSection && !isBottom) return; // 스크롤 가능 영역에선 페이지 이동 방지
        goToNextPage();
      } else if (e.deltaY < 0) {
        // 위로 스크롤
        if (isOverflowSection && !isAtTop) return; // 스크롤 가능 영역에선 페이지 이동 방지
        goToPrevPage();
      }
    };

    // --- 새로운 터치 이벤트 핸들러 ---
    const touchStartEvent = (e: TouchEvent) => {
      if (scrollingRef.current) return;
      // 터치 시작 Y좌표 저장
      touchStartRef.current = e.touches[0].clientY;
    };

    const touchMoveEvent = (e: TouchEvent) => {
      if (scrollingRef.current || touchStartRef.current === 0) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - currentY; // 양수: 위로 스와이프, 음수: 아래로 스와이프

      const currentSection = secRefs.current[page];
      const sectionWrapper = currentSection.querySelector(
        "[data-sec]"
      ) as HTMLElement;
      const { scrollHeight, clientHeight, scrollTop } = sectionWrapper;
      const isOverflowSection = scrollHeight > clientHeight;
      const isBottom = scrollHeight - 1 <= clientHeight + scrollTop;
      const isAtTop = scrollTop <= 0;

      // 위로 스와이프 (다음 페이지로)
      if (deltaY > SWIPE_THRESHOLD) {
        if (isOverflowSection && !isBottom) return;
        goToNextPage();
        touchStartRef.current = 0; // 페이지 이동 후 리셋
      }
      // 아래로 스와이프 (이전 페이지로)
      else if (deltaY < -SWIPE_THRESHOLD) {
        if (isOverflowSection && !isAtTop) return;
        goToPrevPage();
        touchStartRef.current = 0; // 페이지 이동 후 리셋
      }
    };

    const touchEndEvent = () => {
      // 터치가 끝나면 시작점 초기화
      touchStartRef.current = 0;
    };

    // 이벤트 리스너 등록
    window.addEventListener("wheel", wheelEvent);
    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchmove", touchMoveEvent);
    window.addEventListener("touchend", touchEndEvent);

    // 클린업 함수
    return () => {
      window.removeEventListener("wheel", wheelEvent);
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchmove", touchMoveEvent);
      window.removeEventListener("touchend", touchEndEvent);
    };
  }, [page]); // 의존성 배열은 page로 유지

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
    <div ref={mainRef} className="util-h-screen relative">
      {/* Hero - main */}
      <HeroSection ref={secRefs} />

      {/* About */}
      <HomeAbout ref={secRefs} />

      {/* Project */}
      <RecentProject ref={secRefs} />

      {/* Blog */}
      <RecentPosts ref={secRefs} />

      <HomeContact ref={secRefs} />

      {/* 페이지 인디케이터 - pc*/}
      <div className="fixed right-20 top-1/2 z-20 gap-2  flex-col hidden md:flex">
        {Array.from({ length: 5 }, (_, idx) => (
          <div
            key={idx}
            className={`w-[1px] h-[20px] rounded-full  cursor-pointer transition-all duration-300 ${
              idx === page ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => {
              setPage(idx);
            }}
          />
        ))}
      </div>
      {/* 페이지 인디케이터 - mobile*/}
      <div
        style={{ backdropFilter: "blur(10px)" }}
        className="block md:hidden fixed left-0 p-4 md:p-0 rounded-tr-2xl bg-indigo-600/30 md:left-8 bottom-0 md:bottom-10  z-50 text-zinc-400"
      >
        <span className="md:text-3xl text-white mr-1">{page + 1}</span>
        <span className="text-xs">/ 5</span>
      </div>
    </div>
  );
};

export default Home;
