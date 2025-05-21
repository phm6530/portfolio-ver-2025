import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/zustandStore";
import SupabasePool from "@/lib/supabaseClient";
import { toast } from "react-toastify";

const withAuth = <P extends object>(
  Component: ComponentType<P>,
  redirectPath: string
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const { logout, isAuth } = useStore((state) => ({
      logout: state.userAuthLogout,
      isAuth: state.userAuth.login,
    }));
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const { data } = await SupabasePool.getInstance().auth.getSession();
        console.log(data.session);
        if (data.session === null) {
          logout();
          toast.error("권한이 없습니다.!!!");
          navigate(redirectPath);
        }
      };

      checkAuth();
    }, [logout, navigate, redirectPath, isAuth]);

    return isAuth ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};

export default withAuth;
