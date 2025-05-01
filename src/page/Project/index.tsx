import DashBoard from "@/component/ui/DashBoard/DashBoard";
import { PageWrapper } from "@/layout/Grid";
import ProjectRoutes from "@/Route/ProjectRoutes";

export default function Project() {
  return (
    <PageWrapper>
      <DashBoard
        pageTitle={"PROJECT"}
        subComment={"외부로 공개된 참여한 프로젝트만 기재합니다."}
      />

      <ProjectRoutes />
    </PageWrapper>
  );
}
