import { AnimatePresence } from "framer-motion";
import { useLocation, Route, Routes } from "react-router-dom";

import Motion from "@/component/animations/Motion";

import RootNav from "@/layout/RootNav";
import { ROUTE_PATH } from "@/constants/routePath";
import Footer from "@/layout/Footer";
import { useMemo } from "react";

type RouteKey = "" | "about" | "project" | "blog" | "board";

const ROUTE_COLORS = {
  "": {
    primary: "bg-gradient-to-b to-indigo-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/20",
  }, // 홈
  about: {
    primary: "bg-gradient-to-b to-red-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/20",
  }, // About 페이지
  project: {
    primary: "bg-gradient-to-b to-indigo-900/50 from-teal-400/100",
    secondary: "bg-violet-400/20",
  }, // Project 페이지
  blog: {
    primary: "bg-gradient-to-b to-indigo-900/50 from-violet-50/100",
    secondary: "bg-violet-400/20",
  }, // Blog 페이지
  board: {
    primary: "bg-gradient-to-b to-red-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/10",
  }, // Board 페이지
};
const AppRoute = (): JSX.Element => {
  const location = useLocation();
  const pageKey = location.pathname.split("/")[1];

  // 현재 라우트에 맞는 색상 가져오기
  const currentColors = useMemo(() => {
    return pageKey in ROUTE_COLORS
      ? ROUTE_COLORS[pageKey as RouteKey]
      : {
          primary: "bg-gradient-to-b to-purple-900/50 from-purple-50/100",
          secondary: "bg-purple-400/20",
        };
  }, [pageKey]);

  return (
    <>
      <RootNav />
      <div
        className={`glow-5 z-5 absolute pointer-events-none -top-4/5 right-1 size-1/2 md:size-200 ${currentColors.primary} blur-[100px] rounded-full transition-colors duration-700`}
      ></div>
      <div
        className={`glow-5 z-1 absolute pointer-events-none md:-bottom-130 left-0 size-1/2 md:size-150 ${currentColors.secondary} blur-[100px] rounded-full transition-colors duration-700`}
      ></div>
      {/* <div className="glow-5 z-5 absolute -top-4/5 right-1 size-1/2  md:size-200 bg-gradient-to-b to-indigo-900/50 from-violet-50/100 blur-[100px] rounded-full"></div>
      <div className="glow-5 z-5 absolute md:-bottom-80 left-0 size-1/2 md:size-150 bg-violet-400/20 blur-[100px] rounded-full"></div>
 */}

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={`path_${pageKey}`}>
          {ROUTE_PATH.map(({ path, Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={<Motion.Page>{Component}</Motion.Page>}
              />
            );
          })}
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default AppRoute;
