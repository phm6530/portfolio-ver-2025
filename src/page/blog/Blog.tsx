import { AnimatedBackgroundGlows } from "../about/tttt";
import { Route, Routes, useLocation } from "react-router-dom";
import BlogPage from "./pages/blog-page";
import BlogDetail from "./pages/BlogDetail";
import { AnimatePresence } from "framer-motion";
import Motion from "@/component/animations/Motion";
import SubNav from "@/components/shared/sub-nav";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";

const Blog = (): JSX.Element => {
  const location = useLocation();
  const PATHS = [
    { path: "/", index: true, Component: <BlogPage /> },
    { path: "/:id", Component: <BlogDetail /> }, //Item-Page
  ];
  return (
    <>
      <main
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(145, 126, 210, 0.15) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(143, 147, 247, 0.15) 0%, transparent 55%)",
        }}
        className="min-h-screen bg-gradient-to-l from-[#332d38] to-[#95fff4] relative bg-fixed text-white flex flex-col"
      >
        <AnimatedBackgroundGlows />
        {/* <StarAnimation /> */}
        <SidebarWrapper>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Routes location={location} key={location.pathname}>
              {PATHS.map((path) => {
                return (
                  <Route
                    path={path.path}
                    key={path.path}
                    element={
                      <Motion.FadeInOut>{path.Component}</Motion.FadeInOut>
                    }
                  />
                );
              })}
            </Routes>
          </AnimatePresence>{" "}
        </SidebarWrapper>
      </main>
    </>
  );
};

export default Blog;
