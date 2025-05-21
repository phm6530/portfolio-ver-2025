import DarkModeBtn from "@/components/ui/DarkModeBtn";
import { NAVPAGE_OBJECT } from "@/constants/routePath";

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
  const { userAuth } = useStore((state) => state);
  const { popupSetView, PopupComponent } = usePopupHook();
  const logout = useStore((state) => state.userAuthLogout);

  const { mutateAsync } = useMutation({
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
      <PopupComponent Component={LoginForm} />

      <nav
        className={cn(
          `flex gap-3 md:flex-row md:static top-0 md:bg-transparent md:h-auto md:w-auto md:max-w-none`,
          "flex-col fixed bg-background  px-5 md:px-0 pt-4 md:pt-0 -right-[100%] items-start  md:items-center h-screen  z-200 w-[calc(100%-50px)] max-w-[400px] ",
          drawerView && "right-0"
        )}
        style={{
          transition: "right 0.75s cubic-bezier(0.77, 0.2, 0.05, 1)",
        }}
      >
        <div className="md:order-1 mt-10 md:mr-10 md:mt-0 pl-5 md:pl-0  w-full items-start  md:w-auto order-2 flex gap-0 md:gap-7 md:items-center md:flex-row flex-col">
          {NAVPAGE_OBJECT.map((e, idx) => {
            const onAuthPage = e.AuthPage === true;

            if (!userAuth.login && onAuthPage) return;
            return (
              <span
                className={cn(
                  "text-xl py-4 md:py-0 md:text-sm relative text-zinc-600 dark:text-zinc-400 md:text-zinc-200  cursor-pointer  font-bold md:font-normal hover:pl-5  md:hover:pl-0 transition-all w-full  font-Montserrat md:font-Poppins menu-item",
                  e.path === pathname &&
                    "pl-5 md:pl-0 text-zinc-800 dark:text-zinc-50 md:text-zinc-50 md:dark:text-zinc-50  ",
                  scrollOver && "md:text-zinc-900 md:dark:text-zinc-200",
                  drawerView && "on"
                )}
                key={`nav-${idx}`}
                onClick={() => {
                  if (e.path === pathname) return;
                  if (!e.AuthPage || userAuth.login) {
                    navigate(e.path);
                  }
                }}
              >
                {e.path === pathname && (
                  <div className="absolute h-[50%] border-l-4 -left-[10px] md:hidden block" />
                )}
                <div className="absolute h-[50%] border-l-4 -left-[10px] md:group-hover:hidden group-hover:block hidden animate-wiggle" />
                {e.pathName}
              </span>
            );
          })}
        </div>

        <div className="md:order-2 order-1 flex items-center">
          {/* 다크모드 버튼 */}
          <DarkModeBtn scrollOver={scrollOver} />

          {/* login */}
          {!userAuth.login && (
            <span
              className={cn(
                "text-xs md:text-xs cursor-pointer text-zinc-800 dark:text-zinc-50 md:text-zinc-50",
                scrollOver && " md:dark:text-zinc-100 md:text-zinc-800"
              )}
              onClick={() => popupSetView(true)}
            >
              로그인
            </span>
          )}
          {userAuth.login && (
            <span
              className={cn(
                "text-xs md:text-sm cursor-pointer",
                scrollOver && ""
              )}
              onClick={async () => await mutateAsync()}
            >
              로그아웃
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

export default RootNavList;
