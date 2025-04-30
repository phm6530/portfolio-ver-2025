import styled from "styled-components";
import { useLocation, Route, Routes } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Motion from "@/component/animations/Motion";
import BlogPage from "@/page/blog/pages/BlogPage";
import BlogDetail from "@/page/blog/pages/BlogDetail";

const MotionStyle = styled(Motion.FadeInOut)`
  flex: 1;
  width: 100%;
`;

const BlogRoutes = (): JSX.Element => {
  const location = useLocation();
  const PATHS = [
    { path: "/", index: true, Component: <BlogPage /> },
    { path: "/:id", Component: <BlogDetail /> },
  ];

  return (
    <>
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
                element={<MotionStyle>{path.Component}</MotionStyle>}
              />
            );
          })}
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default BlogRoutes;
