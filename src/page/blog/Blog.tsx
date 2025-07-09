import { Route, Routes, useLocation } from "react-router-dom";
import BlogPage from "./pages/blog-page";
import BlogDetail from "./pages/BlogDetail";
import { AnimatePresence } from "framer-motion";
import Motion from "@/components/animations/Motion";

const Blog = (): JSX.Element => {
  const location = useLocation();
  const PATHS = [
    { path: "/", index: true, Component: <BlogPage /> },
    { path: "/:id", Component: <BlogDetail /> }, //Item-Page
  ];
  return (
    <>
      {/* Grow 효과 애니메이션 */}
      {/* <AnimatedBackgroundGlows /> */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {PATHS.map((path) => {
            return (
              <Route
                path={path.path}
                key={path.path}
                element={<Motion.Page>{path.Component}</Motion.Page>}
              />
            );
          })}
        </Routes>
      </AnimatePresence>{" "}
    </>
  );
};

export default Blog;
