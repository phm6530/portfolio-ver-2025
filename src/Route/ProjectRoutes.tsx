import styled from "styled-components";
import { Route, Routes, useLocation } from "react-router-dom";

import ProjectDetail from "@/features/project/ProjectDetail";
import withAuth from "@/hoc/WithAuth";
import Motion from "@/component/animations/Motion";
import ProjectList from "@/features/project/ProjectList";
import ProjectForm from "@/features/project/ProjectEditor/ProjectForm";

const FlexMotion = styled(Motion.FadeInOut)`
  flex-grow: 1;
`;

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
      <div className="layout-center pt-10">
        <Routes location={location} key={location.pathname}>
          {PATHS.map((path) => {
            return (
              <Route
                path={path.path}
                key={path.path}
                element={<FlexMotion>{path.Component}</FlexMotion>}
              />
            );
          })}
        </Routes>
      </div>
    </>
  );
};

export default ProjectRoutes;
