import StackIconMapper, {
  STACK_ICONS,
} from "@/components/shared/stack-iconmapper";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function StackEffect() {
  const arr = Object.keys(STACK_ICONS);
  const ref = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      iconsRef.current.forEach((icon, index) => {
        // 랜덤 위치 설정
        const randomX = Math.floor(Math.random() * 80) - 40; // -40%에서 40% 사이
        const randomY = Math.floor(Math.random() * 80) - 40; // -40%에서 40% 사이

        // 아이콘 초기 위치 설정
        gsap.set(icon, {
          left: `${50 + randomX}%`,
          top: `${50 + randomY}%`,
          xPercent: -50,
          yPercent: -50,
          position: "absolute",
        });

        // 페이드인 애니메이션
        gsap.fromTo(
          icon,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            delay: 0.7 + index * 0.1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              const randomAmplitude = 3 + Math.random() * 25; // 진폭 범위 조정
              const randomDuration = 2 + Math.random() * 1;

              // Y축 떠다니는 효과
              gsap.to(icon, {
                y: randomAmplitude,
                duration: randomDuration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });

              // 회전 효과
              gsap.to(icon, {
                rotation: Math.random() > 0.5 ? 3 : -3,
                duration: randomDuration * 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });

              // X축 떠다니는 효과
              gsap.to(icon, {
                x: (Math.random() - 0.5) * 20,
                duration: randomDuration * 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="absolute pointer-events-none w-full h-full top-0">
      {arr.map((stack, idx) => (
        <div
          className="absolute  p-2 bg-black/15 rounded-full
          "
          key={`${stack}:${idx}`}
          ref={(el) => el && iconsRef.current.push(el)}
        >
          <StackIconMapper
            stackName={stack}
            className="stack-icon opacity-50 [&>*]:fill-white size-5"
          />
        </div>
      ))}
    </div>
  );
}
