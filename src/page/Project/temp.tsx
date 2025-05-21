import { Route, Routes, useLocation } from "react-router-dom";
import withAuth from "@/hoc/WithAuth";
import Motion from "@/components/animations/Motion";
import ProjectList from "@/features/project/ProjectList";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";

const ProjectRoutes = (): JSX.Element => {
  const location = useLocation();

  const AthencatedProjectEditor = withAuth(ProjectForm, "/project");

  const PATHS = [
    { path: "/", index: true, Component: <ProjectList /> },
    {
      path: "/write",
      Component: <AthencatedProjectEditor />,
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] mx-auto w-[calc(100%-20px)] pt-10">
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
      </div>
    </>
  );
};

export default ProjectRoutes;
