import DarkModeBtn from "@/component/ui/DarkModeBtn";
import { NAVPAGE_OBJECT } from "@/constants/routePath";
import useLogout from "@/features/auth/hooks/useLogout";
import LoginForm from "@/features/auth/LoginForm";
import usePopupHook from "@/hooks/usePopupHook";
import useStore from "@/store/zustandStore";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import SupabasePool from "@/lib/supabaseClient";
import { toast } from "react-toastify";

const RootNavList: React.FC<{ drawerView: boolean; scrollOver: boolean }> = ({
  drawerView,
  scrollOver,
}) => {
  const { darkMode, userAuth } = useStore((state) => state);
  const { popupSetView, PopupComponent } = usePopupHook();
  const logout = useStore((state) => state.userAuthLogout);

  const { mutate, mutateAsync } = useMutation({
    mutationFn: async () => {
      await SupabasePool.getInstance().auth.signOut();
    },
    onSuccess: () => {
      logout();
      toast.info("로그아웃 되었습니다");
    },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* 팝업 커스텀 훅 */}
      <PopupComponent type="modal" Component={LoginForm} />

      <nav
        className={cn(
          `flex gap-3 md:flex-row md:static md:bg-transparent md:h-auto md:w-auto md:max-w-none`,
          "flex-col fixed bg-background -right-[100%] h-screen   w-[calc(100%-50px)] max-w-[400px]",
          drawerView && "right-0"
        )}
        style={{
          transition: "right 0.75s cubic-bezier(0.77, 0.2, 0.05, 1)",
        }}
      >
        <div className="md:order-1 order-2 flex gap-5 items-center md:flex-row flex-col">
          {NAVPAGE_OBJECT.map((e, idx) => {
            const onAuthPage = e.AuthPage === true;

            if (!userAuth.login && onAuthPage) return;
            return (
              <span
                className="text-sm cursor-pointer"
                key={`nav-${idx}`}
                onClick={() => {
                  if (e.path === pathname) return;
                  if (!e.AuthPage || userAuth.login) {
                    navigate(e.path);
                  }
                }}
              >
                {e.pathName}
              </span>
            );
          })}
        </div>

        <div className="md:order-2 order-1 flex items-center">
          {/* 다크모드 버튼 */}
          <DarkModeBtn />

          {/* login */}
          {!userAuth.login && (
            <span className="text-sm" onClick={() => popupSetView(true)}>
              로그인
            </span>
          )}
          {userAuth.login && (
            <span className="text-sm" onClick={async () => await mutateAsync()}>
              로그아웃
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

export default RootNavList;
