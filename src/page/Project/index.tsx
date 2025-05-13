import Motion from "@/component/animations/Motion";
import ProjectDetail from "@/features/project/ProjectDetail";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";
import ProjectList from "@/features/project/ProjectList";
import withAuth from "@/hoc/WithAuth";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatedBackgroundGlows } from "../about/tttt";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";

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
      <main className="bg-zinc-900 ">
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
          </AnimatePresence>
        </SidebarWrapper>
      </main>
    </>
  );
}
