import DarkModeBtn from "@/component/ui/DarkModeBtn";
import { NAVPAGE_OBJECT } from "@/constants/routePath";
import useLogout from "@/features/auth/hooks/useLogout";
import LoginForm from "@/features/auth/LoginForm";
import usePopupHook from "@/hooks/usePopupHook";
import * as S from "./RootNavStyle";
import useStore from "@/store/zustandStore";
import { useLocation, useNavigate } from "react-router-dom";

const RootNavList: React.FC<{ drawerView: boolean; scrollOver: boolean }> = ({
  drawerView,
  scrollOver,
}) => {
  const { darkMode, userAuth } = useStore((state) => state);
  const { popupSetView, PopupComponent } = usePopupHook();

  const { mutateAsync } = useLogout();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* 팝업 커스텀 훅 */}
      <PopupComponent type="modal" Component={LoginForm} />
      <S.LinkWrapper $toggle={drawerView}>
        <S.UiStyle $link={true}>
          {NAVPAGE_OBJECT.map((e, idx) => {
            const onAuthPage = e.AuthPage === true;

            //권한필요한거는 랜더링 안함
            if (!userAuth.login && onAuthPage) {
              return;
            }

            return (
              <span
                onClick={() => {
                  if (e.path === pathname) return; //같은 path 재랜더링 방지
                  if (!e.AuthPage || userAuth.login) {
                    navigate(e.path);
                  }
                }}
              >
                {e.pathName}
              </span>
            );
          })}
        </S.UiStyle>
        <S.UiStyle>
          {/* 다크모드 버튼 */}
          <DarkModeBtn />
          {/* login Component */}
          {!userAuth.login && <span>로그인</span>}
          {userAuth.login && (
            <span onClick={async () => await mutateAsync()}>로그아웃</span>
          )}{" "}
        </S.UiStyle>
      </S.LinkWrapper>
    </>
  );
};

export default RootNavList;
