import DashBoard from "@/component/ui/DashBoard/DashBoard";
import ProjectRoutes from "@/Route/ProjectRoutes";

export default function Project() {
  return (
    <>
      <DashBoard
        pageTitle={"My Work Project List"}
        subComment="포트폴리오형 프로젝트 목록입니다"
      />
      <ProjectRoutes />
    </>
  );
}
