import PopupBackDrop from "@/component/popup/PopupBackDrop";
import Confirm from "@/component/ui/Confirm";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useStore from "@/store/zustandStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BackDrop from "@/components/ui/Backdrop";

interface ConfirmProps {
  event: () => Promise<void>;
}

interface ModalProps {
  Component: React.ElementType;
}

type PopupComponentProps = {
  type: "modal" | "confirm";
} & (ModalProps | ConfirmProps);

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

  const PopupComponent: React.FC<PopupComponentProps> = ({
    type,
    ...props
  }) => {
    // 타입 좁히기
    const isModal = (props: ModalProps | ConfirmProps): props is ModalProps =>
      type === "modal";

    const completeClose = () => {
      if ("event" in props) {
        props.event().then(() => {
          triggerAnimation();
        });
      }
    };

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
                  {/* 외부 컴포넌트 모달 or Confirm 타입좁히기*/}
                  {isModal(props) ? (
                    <>
                      <props.Component />
                    </>
                  ) : (
                    <Confirm message="제거" confirm={completeClose} />
                  )}

                  <Button
                    className="close mt-1 rounded-full"
                    variant={"ghost"}
                    onClick={delayClosePopup}
                  >
                    Close
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
