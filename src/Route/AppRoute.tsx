import { useLocation, Route, Routes } from "react-router-dom";

import RootNav from "@/layout/RootNav";
import { ROUTE_PATH } from "@/constants/routePath";
import Footer from "@/layout/Footer";
import { useMemo } from "react";
import PageTransition from "@/components/animations/page-transition";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import { cn } from "@/lib/utils";

type ROUTE_KEY = "" | "about" | "project" | "blog" | "board";

type PATHNAME<T> = Record<ROUTE_KEY, T>;
const ROUTE_COLORS: PATHNAME<{ primary: string; secondary: string }> = {
  "": {
    primary: "bg-gradient-to-b to-indigo-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/20",
  }, // 홈
  about: {
    primary: "bg-gradient-to-b to-red-500/80 from-violet-50/60",
    secondary: "bg-gradient-to-t to-rose-900/30 from-blue-500/30",
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

const BG_COLOR: PATHNAME<string> = {
  "": "bg-red-300", // 홈
  about: "bg-zinc-900", // About 페이지
  project: "bg-zinc-900", // About 페이지
  blog: "bg-zinc-900", // About 페이지
  board: "bg-zinc-900", // About 페이지
};

const AppRoute = (): JSX.Element => {
  const location = useLocation();
  const pageKey = location.pathname.split("/")[1];

  const currentColors = useMemo(() => {
    return pageKey in ROUTE_COLORS
      ? ROUTE_COLORS[pageKey as ROUTE_KEY]
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
      />
      <div
        className={`glow-5 z-1 absolute pointer-events-none md:-bottom-130 left-0 size-1/2 md:size-150 ${currentColors.secondary} blur-[100px] rounded-full transition-colors duration-700`}
      />
      <main
        className={cn(
          BG_COLOR[pageKey as keyof typeof BG_COLOR],
          "transition-colors duration-700"
        )}
      >
        {/* Page Transition */}
        <SidebarWrapper>
          <PageTransition>
            {/* Route-Dom */}
            <Routes location={location} key={`path_${pageKey}`}>
              {ROUTE_PATH.map(({ path, Component }) => {
                return <Route key={path} path={path} element={Component} />;
              })}
            </Routes>{" "}
          </PageTransition>{" "}
        </SidebarWrapper>
      </main>
      <Footer />
    </>
  );
};

export default AppRoute;
