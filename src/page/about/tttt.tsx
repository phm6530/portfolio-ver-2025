"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 움직이는 배경 글로우 컴포넌트
export const AnimatedBackgroundGlows = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.to(".glow-1", {
        opacity: 0.7,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".glow-2", {
        opacity: 0.6,
        scale: 1.1,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(".glow-3", {
        opacity: 0.8,
        scale: 1.15,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // 스크롤 패럴랙스 효과
      // 첫 번째 글로우 - 느린 속도로 반대 방향 (배경)
      gsap.to(".glow-1", {
        y: "-20%", // 스크롤 방향과 반대로 느리게 이동
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // 스크롤에 부드럽게 반응 (숫자가 클수록 지연 효과)
          invalidateOnRefresh: true,
        },
      });

      // 두 번째 글로우 - 중간 속도로 이동 (중간 레이어)
      gsap.to(".glow-2", {
        y: "40%", // 스크롤 방향과 같은 방향으로 더 빠르게 이동
        x: "-10%",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // 세 번째 글로우 - 빠른 속도로 이동 (전경)
      gsap.to(".glow-3", {
        y: "60%", // 스크롤 방향과 같은 방향으로 가장 빠르게 이동
        x: "15%",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2, // 빠르게 반응
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* 클래스명 수정: grow -> glow */}
      <div className="glow-1 absolute -top-10 -right-10 w-60 h-60 bg-sky-500/30 blur-[80px] rounded-full"></div>
      <div className="glow-2 absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full"></div>
      <div className="glow-3 absolute bottom-1/3 right-1/3 w-60 h-60 bg-indigo-600/30 blur-[100px] rounded-full"></div>
    </div>
  );
};
