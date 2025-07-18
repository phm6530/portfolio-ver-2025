import { useLocation, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Motion from "@/components/animations/Motion";
import BlogPage from "@/page/blog/pages/blog-page";
import BlogDetail from "@/page/blog/pages/BlogDetail";

const BlogRoutes = (): JSX.Element => {
  const location = useLocation();
  const PATHS = [
    { path: "/", index: true, Component: <BlogPage /> },
    { path: "/:id", Component: <BlogDetail /> },
  ];

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {PATHS.map((path) => {
            return (
              <Route
                path={path.path}
                key={path.path}
                element={<Motion.FadeInOut>{path.Component}</Motion.FadeInOut>}
              />
            );
          })}
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default BlogRoutes;
