import { AnimatedBackgroundGlows } from "../about/tttt";
import { Route, Routes, useLocation } from "react-router-dom";
import BlogPage from "./pages/blog-page";
import BlogDetail from "./pages/BlogDetail";
import { AnimatePresence } from "framer-motion";
import Motion from "@/component/animations/Motion";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";

const Blog = (): JSX.Element => {
  const location = useLocation();
  const PATHS = [
    { path: "/", index: true, Component: <BlogPage /> },
    { path: "/:id", Component: <BlogDetail /> }, //Item-Page
  ];
  return (
    <>
      <main className="bg-gradient-to-t to-black via-rose-800/5">
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
