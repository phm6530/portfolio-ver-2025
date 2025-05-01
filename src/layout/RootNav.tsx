import * as S from "@/layout/RootNavStyle";
import BackDrop from "@/component/popup/Backdrop";
import TopButton from "@/component/ui/TopButton";
import useScrollY from "@/hooks/useScrollY";
import useStore from "@/store/zustandStore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerMenu from "@/component/ui/DrawerMenu";
import RootNavList from "./RootNavList";
import { cn } from "@/lib/utils";

export default function RootNav() {
  const darkMode = useStore((state) => state.darkMode);
  const { scrollOver } = useScrollY(430);
  const location = useLocation();
  const navigate = useNavigate();

  // 햄버거 메뉴 + draw 여부
  const [drawerView, setDrawerView] = useState<boolean>(false);

  useEffect(() => {
    setDrawerView(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (drawerView) {
        event.preventDefault();
      }
    };

    if (drawerView) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", handleScroll);
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [drawerView]);

  return (
    <>
      {drawerView && <BackDrop onClick={() => setDrawerView(false)} />}

      {/* Top Button  */}
      <TopButton />

      <header
        style={{
          backdropFilter: "blur(20px)",
        }}
        className="fixed  z-100 w-full border-b border-border/10 bg-background/0 "
      >
        <div
          className={cn(
            "text-white flex items-center layout-center justify-between py-5"
          )}
        >
          <span className="font-Montserrat" onClick={() => navigate("/")}>
            PHM{`'`} Portfolio .
          </span>

          <DrawerMenu
            drawerView={drawerView}
            scrollOver={scrollOver}
            setDrawerView={setDrawerView}
          />

          {/* Nav */}
          <RootNavList drawerView={drawerView} scrollOver={scrollOver} />
        </div>
      </header>
    </>
  );
}
