import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";

export default function TextGradientAnimation({
  children,
}: {
  children: ReactNode;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // 애니메이션 설정
    gsap.to(textRef.current, {
      backgroundPosition: "300% 50%",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    return () => {
      if (textRef.current) {
        gsap.killTweensOf(textRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={textRef}
      className="gsap-gradient"
      style={{
        background:
          "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f43f5e, #f59e0b, #10b981, #3b82f6)",
        backgroundSize: "300% 100%",
        backgroundPosition: "0% 50%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}
