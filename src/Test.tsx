import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const mainRef = useRef<HTMLDivElement>(null);
  const secRefs = useRef<HTMLElement[]>([]);
  const [page, setPage] = useState(0);
  const SECTION_DURATION = 1200;
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

    gsap.utils.toArray(secRefs.current).forEach((sec, idx) => {
      if (idx <= targetPage) {
        const tl = gsap.timeline();
        tl.to(sec as HTMLElement, {
          y: 0,
          ease: "expo.inOut",
          duration: SECTION_DURATION / 1000,
          delay: idx * 0.1,
        });
      } else {
        gsap.to(sec as HTMLElement, {
          y: window.innerHeight,
          ease: "expo.inOut",
          duration: SECTION_DURATION / 1000,
          delay: idx * 0.1,
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
        if (e.deltaY > 0 && isBottom) {
          const nextPage = page + 1;
          setPage(nextPage);
          pageMoveHandler(nextPage);
        } else if (e.deltaY < 0 && isAtTop) {
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
      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current[0] = el;
          }
        }}
        className="h-screen flex items-center justify-center bg-zinc-900 z-10 w-screen absolute"
      >
        <div className="text-center">
          <h1 className="text-4xl uppercase text-white mb-4">Section 1</h1>
          <p className="text-white/60">
            휠을 아래로 굴려보세요 (풀페이지 전환)
          </p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current[1] = el;
          }
        }}
        className="h-screen flex flex-col items-center justify-start bg-cyan-950 z-11 w-screen absolute overflow-y-auto"
      >
        <div className="py-30 ">
          <div className="text-center ">
            <h1 className="text-4xl text-white mb-4">
              Section 2 - 스크롤 가능
            </h1>
            <p className="text-white/60 mb-8">
              이 섹션에서는 일반 스크롤이 됩니다
            </p>
            <p className="text-white/40">
              맨 아래까지 스크롤하면 다음 섹션으로 넘어갑니다
            </p>
          </div>

          <div className="text-center py-20 border-t border-white/10">
            <h2 className="text-3xl text-white mb-4">콘텐츠 블록 1</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              여기는 긴 콘텐츠가 들어갑니다. 일반적인 스크롤이 가능합니다.
              ScrollTrigger를 사용해서 이 섹션에서만 일반 스크롤이 동작하도록
              했습니다.
            </p>
          </div>

          <div className="text-center py-20 border-t border-white/10">
            <h2 className="text-3xl text-white mb-4">콘텐츠 블록 2</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              계속 스크롤해보세요. 각 블록 사이에는 적절한 간격이 있어서 충분히
              스크롤할 수 있습니다.
            </p>
          </div>

          <div className="text-center py-20 border-t border-white/10">
            <h2 className="text-3xl text-white mb-4">콘텐츠 블록 3</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              이제 거의 다 왔습니다. 다음 블록이 마지막이에요.
            </p>
          </div>

          <div className="text-center py-20 border-t border-white/10">
            <h2 className="text-3xl text-white mb-4">콘텐츠 블록 4 (마지막)</h2>
            <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              여기가 마지막 블록입니다. 이제 스크롤하면 ScrollTrigger가 섹션의
              끝을 감지해서 자동으로 다음 섹션(Section 3)으로 넘어갑니다.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current[2] = el;
          }
        }}
        className="h-screen flex items-center justify-center bg-violet-900 z-12 w-screen absolute"
      >
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Section 3</h1>
          <p className="text-white/60">다시 풀페이지 전환 모드입니다</p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current[3] = el;
          }
        }}
        className="h-screen flex items-center justify-center bg-yellow-900 z-13 w-screen absolute"
      >
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Section 4</h1>
          <p className="text-white/60">풀페이지 전환</p>
        </div>
      </section>

      <section
        ref={(el) => {
          if (el && !secRefs.current.includes(el)) {
            secRefs.current[4] = el;
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
}
