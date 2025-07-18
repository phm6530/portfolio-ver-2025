import { useLocation, Route, Routes } from "react-router-dom";

import RootNav from "@/layout/RootNav";
import { ROUTE_PATH } from "@/constants/routePath";
import Footer from "@/layout/Footer";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import GrowEffect from "@/components/effect/grow-effect";
import { AnimatePresence } from "framer-motion";
import Motion from "@/components/animations/Motion";
import Home from "@/page/Home";
import SubNav from "@/components/shared/sub-nav";

type ROUTE_KEY = "" | "about" | "project" | "blog" | "board";
export type PATHNAME<T> = Record<ROUTE_KEY, T>;

const BG_COLOR: PATHNAME<string> = {
  "": "", // 홈
  about: "bg-zinc-900 ", // About 페이지
  project: "bg-zinc-900", // About 페이지
  blog: "bg-zinc-900", // About 페이지
  board: "bg-zinc-900", // About 페이지
};

gsap.registerPlugin(ScrollSmoother);

const AppRoute = (): JSX.Element => {
  const location = useLocation();
  const pageKey = location.pathname.split("/")[1] || "main";

  // 패스네임 타입가드
  const pathNameVaildate = (path: string): path is ROUTE_KEY => {
    return ["", "about", "project", "blog", "board"].includes(path);
  };

  const getValidRouteKey = (pathname: string): ROUTE_KEY => {
    return pathNameVaildate(pathname) ? pathname : "";
  };

  // 메인여부
  const isMainPage = pageKey === "main";

  return (
    <>
      {/* Root Nav */}
      <RootNav />

      {/* grlow */}
      <GrowEffect pageKey={getValidRouteKey(pageKey)} />

      <main
        className={cn(
          BG_COLOR[pageKey as keyof typeof BG_COLOR],
          "transition duration-700"
        )}
      >
        <AnimatePresence mode="wait">
          {/* Main-page */}
          {isMainPage ? (
            <Motion.FadeInOut key="main">
              <Home />
            </Motion.FadeInOut>
          ) : (
            <>
              {/* Sub-Page */}
              <Motion.Page key="sub">
                <div className="grid md:grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40">
                  <div className="md:block hidden">
                    <SubNav />
                  </div>
                  <div className="content-area">
                    <AnimatePresence mode="wait">
                      <Routes location={location} key={`sub_${pageKey}`}>
                        {ROUTE_PATH.filter((route) => route.path !== "/").map(
                          ({ path, Component }) => (
                            <Route
                              key={path}
                              path={path}
                              element={
                                <Motion.Page key={path}>
                                  {Component}
                                </Motion.Page>
                              }
                            />
                          )
                        )}
                      </Routes>
                    </AnimatePresence>
                  </div>
                </div>{" "}
                <Footer />
              </Motion.Page>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default AppRoute;
