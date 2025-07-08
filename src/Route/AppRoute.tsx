import { useLocation, Route, Routes } from "react-router-dom";

import RootNav from "@/layout/RootNav";
import { ROUTE_PATH } from "@/constants/routePath";
import Footer from "@/layout/Footer";
import { useRef } from "react";
import PageTransition from "@/components/animations/page-transition";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import GrowEffect from "@/components/effect/grow-effect";

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
  const pageKey = location.pathname.split("/")[1];
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  });

  useGSAP(
    () => {
      gsap.to(bgRef.current, {
        // opacity: 0,
        top: -100,
        scrollTrigger: {
          trigger: "html",
          // markers: true,
        },
      });
    },
    { scope: "html" }
  );

  useGSAP(
    () => {
      gsap.to(videoRef.current, {
        opacity: 1,
        background: "#000",
        scrollTrigger: {
          trigger: "html",
          start: "center center",
          end: "center center",
          // markers: true,
          toggleActions: "restart reverse reverse reverse",
          scrub: 1,
        },
        markers: true,
        scrub: 1,
      });
    },
    { scope: "html" }
  );

  // 패스네임 타입가드
  const pathNameVaildate = (path: string): path is ROUTE_KEY => {
    return ["", "about", "project", "blog", "board"].includes(path);
  };

  const getValidRouteKey = (pathname: string): ROUTE_KEY => {
    return pathNameVaildate(pathname) ? pathname : "";
  };

  console.log("??", `test :${pathNameVaildate(pageKey)};;;`, pageKey);

  return (
    <>
      <RootNav />

      {/* grlow */}
      <GrowEffect pageKey={getValidRouteKey(pageKey)} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main
            className={cn(
              BG_COLOR[pageKey as keyof typeof BG_COLOR],
              "transition duration-700"
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
            </SidebarWrapper>{" "}
            <Footer />{" "}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppRoute;
