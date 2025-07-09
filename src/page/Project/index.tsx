import ProjectDetail from "@/features/project/ProjectDetail";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";
import ProjectList from "@/features/project/ProjectList";
import withAuth from "@/hoc/WithAuth";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Motion from "@/components/animations/Motion";

export default function Project() {
  const location = useLocation();
  const AthencatedProjectEditor = withAuth(ProjectForm, "/project");

  const PATHS = [
    { path: "/", index: true, Component: <ProjectList /> },
    {
      path: "/write",
      Component: <AthencatedProjectEditor />,
    },
    { path: "/:id", Component: <ProjectDetail /> },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </>
  );
}
