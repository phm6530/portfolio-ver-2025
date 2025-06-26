import React, { ReactNode, useRef } from "react";
import SubNav from "../shared/sub-nav";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import gsap from "gsap";

export default function SidebarWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);
  const ANIMATION_DURATION = 400;

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
      y: 50,
      duration: ANIMATION_DURATION / 1000,
      ease: "power2.in",
    });
  };

  // 메인과 서브 Aniamtion 분리
  const isMain = location.pathname === "/";
  const key = isMain ? "main" : "sub";

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={key}
        timeout={ANIMATION_DURATION}
        unmountOnExit
        nodeRef={nodeRef}
        onEnter={onPageEnter}
        onExit={onPageExit}
        onEntering={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div ref={nodeRef}>
          {isMain ? (
            <>{children}</>
          ) : (
            <div className="grid md:grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
              <div className="md:block hidden">
                <SubNav />
              </div>
              {children}
            </div>
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
