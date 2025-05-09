import Motion from "@/component/animations/Motion";
import ProjectDetail from "@/features/project/ProjectDetail";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";
import ProjectList from "@/features/project/ProjectList";
import withAuth from "@/hoc/WithAuth";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { AnimatedBackgroundGlows } from "../about/tttt";
import SubNav from "@/components/shared/sub-nav";

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

        <div className="grid grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
          <div>
            <SubNav />
          </div>
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
        </div>
      </main>
    </>
  );
}
