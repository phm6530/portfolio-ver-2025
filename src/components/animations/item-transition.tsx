import gsap from "gsap";
import { ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function ItemTransition({ children }: { children: ReactNode }) {
  const ANIMATION_DURATION = 400;
  const nodeRef = useRef<HTMLDivElement>(null);
  const onPageEnter = () => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, x: -150 }, // 시작 상태
      {
        opacity: 1,
        x: 0,
        duration: ANIMATION_DURATION / 1000,
        ease: "power2.out",
      }
    );
  };

  const onPageExit = () => {
    gsap.to(nodeRef.current, {
      opacity: 0,
      x: 100,
      duration: ANIMATION_DURATION / 1000,
      ease: "power2.in",
    });
  };

  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname.split("/")[2] || ""}
        timeout={ANIMATION_DURATION}
        unmountOnExit
        nodeRef={nodeRef}
        onEnter={onPageEnter}
        onExit={onPageExit}
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
}
