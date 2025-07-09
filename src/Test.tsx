import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const [page, setPage] = useState(0);
  const secRefs = useRef<HTMLElement[]>([]);
  const canScroll = useRef(true);

  // body styled 제거
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useGSAP(
    () => {
      gsap.utils.toArray(secRefs.current).forEach((e, idx) => {
        if (idx !== 0) {
          gsap.set(e as HTMLElement, { y: innerHeight });
        }
      });

      // 긴 콘텐츠가 있는 섹션에 ScrollTrigger 설정
      const longContentSection = secRefs.current[1];
      if (longContentSection) {
        ScrollTrigger.create({
          trigger: longContentSection,
          start: "top top",
          end: "bottom bottom",
          onEnter: () => {
            canScroll.current = false; // 섹션 내부 스크롤 활성화
            document.body.style.overflow = "auto";
          },
          onLeave: () => {
            canScroll.current = true; // 페이지 스크롤 활성화
            document.body.style.overflow = "hidden";
            // 다음 섹션으로 자동 이동
            if (page < secRefs.current.length - 1) {
              setPage(page + 1);
              animateToPage(page + 1);
            }
          },
          onEnterBack: () => {
            canScroll.current = false;
            document.body.style.overflow = "auto";
          },
          onLeaveBack: () => {
            canScroll.current = true;
            document.body.style.overflow = "hidden";
          },
        });
      }
    },
    { scope: mainRef, dependencies: [secRefs.current] }
  );

  // 휠 이벤트 핸들러
  const handleWheel = (e: WheelEvent) => {
    if (isScrolling.current || !canScroll.current) return;

    const delta = e.deltaY;
    const totalPages = secRefs.current.length;

    if (delta > 0 && page < totalPages - 1) {
      // 아래로 스크롤 - 다음 페이지
      setPage((prev) => prev + 1);
      animateToPage(page + 1);
    } else if (delta < 0 && page > 0) {
      // 위로 스크롤 - 이전 페이지
      setPage((prev) => prev - 1);
      animateToPage(page - 1);
    }
  };

  // 페이지 애니메이션
  const animateToPage = (targetPage: number) => {
    if (isScrolling.current) return;

    isScrolling.current = true;

    // 현재 페이지부터 타겟 페이지까지 순차적으로 애니메이션
    gsap.utils.toArray(secRefs.current).forEach((section, idx) => {
      if (idx <= targetPage) {
        gsap.to(section as HTMLElement, {
          y: 0,
          duration: 0.8,
          ease: "expo.inOut",
          delay: idx * 0.1,
        });
      } else {
        gsap.to(section as HTMLElement, {
          y: innerHeight,
          duration: 0.8,
          ease: "expo.inOut",
          delay: (idx - targetPage) * 0.1,
        });
      }
    });

    // 애니메이션 완료 후 스크롤 허용
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  // 휠 이벤트 리스너 등록
  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        mainElement.removeEventListener("wheel", handleWheel);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [page]);

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
        className="h-auto  min-h-screen flex flex-col items-center justify-start bg-cyan-950 z-11 w-screen absolute overflow-y-auto"
      >
        <div className="text-center py-20">
          <h1 className="text-4xl text-white mb-4">Section 2 - 스크롤 가능</h1>
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
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        {Array.from({ length: secRefs.current.length }, (_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full mb-2 cursor-pointer transition-all duration-300 ${
              idx === page ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => {
              setPage(idx);
              animateToPage(idx);
            }}
          />
        ))}
      </div>
    </main>
  );
}
