import gsap from "gsap";
import { ReactNode, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export default function PageTransition({ children }: { children: ReactNode }) {
  const ANIMATION_DURATION = 400;
  const nodeRef = useRef<HTMLDivElement>(null);
  const onPageEnter = () => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, y: -100 }, // 시작 상태
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION_DURATION / 1000,
        ease: "power2.out",
      }
    );
  };

  const onPageExit = () => {
    gsap.to(nodeRef.current, {
      opacity: 0,
      y: -50,
      duration: ANIMATION_DURATION / 1000,
      ease: "power2.in",
    });
  };

  const location = useLocation();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname.split("/")[1]}
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
