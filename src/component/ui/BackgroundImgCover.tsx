import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const BackgroundImgCover: React.FC<{
  mainPage?: boolean;
  imgSrc: string;
  children?: React.ReactNode;
}> = ({ mainPage, imgSrc, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (ref.current) {
        // 타임라인 생성
        const tl = gsap.timeline();

        // 초기 상태 설정
        gsap.set(ref.current, {
          autoAlpha: 0,
          opacity: 0,
          scale: 1,
        });

        tl.to(
          ref.current,
          {
            duration: 0.3,
            autoAlpha: 1,
            opacity: 1,
            ease: "circ",
          },
          "-=0.3"
        );

        tl.to(
          ref.current,
          {
            duration: 0.8,
            scale: 1.2, // 약간 축소
            ease: "power2.in",
          },
          "-=0.2"
        );

        tl.to(
          ref.current,
          {
            duration: 10,
            scale: 1.4, // 천천히 다시 확대
            ease: "power2.out",
            repeat: -1, // 무한 반복
            yoyo: true, // 왔다갔다 효과
          },
          "-=0.4"
        ); // 0.2초 딜레이 후 시작

        if (bgRef.current) {
          gsap.fromTo(
            bgRef.current,
            { opacity: 0 },
            {
              opacity: 1,

              duration: 0.6,
              ease: "sine.inOut",
              delay: 0.5,
            }
          );
        }
      }
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={cn("inset-0 absolute w-full h-full bg-red-50 bg-cover")}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: "bottom",
      }}
    >
      <div
        ref={bgRef}
        className="fixed inset-0 w-full h-full z-1 bg-gradient-to-r from-[#b397b015] via-[#05050573] to-[#160a15a4]"
        style={{ opacity: 0 }}
      />

      {children}
    </div>
  );
};

export default BackgroundImgCover;
