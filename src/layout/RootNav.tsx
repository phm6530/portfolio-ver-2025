import BackDrop from "@/components/ui/Backdrop";
import TopButton from "@/components/shared/TopButton";
import useScrollY from "@/hooks/useScrollY";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DrawerMenu from "@/components/ui/DrawerMenu";
import RootNavList from "./RootNavList";
import { cn } from "@/lib/utils";

export default function RootNav() {
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
        className={cn(
          "fixed  z-200 w-full border-b border-border/10 bg-background/0 ",
          scrollOver && "border-border bg-background/70"
        )}
      >
        <div
          className={cn(
            "text-white flex items-center layout-center justify-between py-5"
          )}
        >
          <span
            className={cn(
              "font-Montserrat font-extrabold cursor-pointer",
              scrollOver && "text-zinc-900 dark:text-white"
            )}
            onClick={() => navigate("/")}
          >
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
