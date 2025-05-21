import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useStore from "@/store/zustandStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BackDrop from "@/components/ui/Backdrop";

const usePopupHook = () => {
  const [popupView, popupSetView] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<boolean>(false);
  const login = useStore((state) => state.userAuth.login);

  //애니메이션 트리거 만듬
  const triggerAnimation = () => {
    setAnimationState(true);

    setTimeout(() => {
      popupSetView(false);
      setAnimationState(false);
    }, 400);
  };

  // 애니메이션 딜레이 주기 로그인은 알아서 닫히게
  useEffect(() => {
    if (login) {
      triggerAnimation();
    }
  }, [login]);

  // 닫기
  const delayClosePopup = () => {
    triggerAnimation();
  };

  const PopupComponent: React.FC<{
    Component: React.ComponentType;
  }> = ({ Component }) => {
    return (
      <>
        {popupView && (
          <>
            {ReactDOM.createPortal(
              <BackDrop />,
              document.getElementById("backdrop-root")!
            )}
            {ReactDOM.createPortal(
              <div className="popup-layout z-250">
                <div
                  className={cn(
                    "p-5 bg-background shadow-2xl rounded-xl border border-border ",
                    popupView && "animate-popup-in",
                    animationState && "animate-popup-out"
                  )}
                >
                  {/* 외부 컴포넌트 받아서 랜더 - login 만써서 나머진 타입들 다 삭제 시킴  */}
                  <Component />
                  <Button
                    className="close mt-1 rounded-full"
                    variant={"ghost"}
                    onClick={delayClosePopup}
                  >
                    닫기
                  </Button>
                </div>
              </div>,
              document.getElementById("modal-root")!
            )}
          </>
        )}
      </>
    );
  };

  return { popupSetView, PopupComponent };
};

export default usePopupHook;
