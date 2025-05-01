import ProjectListItem from "@/features/project/ProjectListItem";
import { SubTitle } from "@/component/ui/Subtitle";
import CateGoryButton from "@/component/ui/CateGoryButton";
import { ReactRouteDom } from "@/lib/lib";
import SkeletonPost from "@/component/loading/Skeleton";
import SearchForm from "@/component/ui/SearchForm";
import * as S from "@/features/project/ProjectListStyle";

import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useNavigate, useNavigation } from "react-router-dom";

const { useSearchParams } = ReactRouteDom;

export default function ProjectList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await requestHandler(async () => {
        const rows = await SupabasePool.getInstance()
          .from("project_meta")
          .select("*")
          .order("id", { ascending: false });

        if (rows.error || !rows.data) {
          throw new Error(`요청 실패 : ${rows.error.message}`);
        }

        return rows;
      });
    },
    staleTime: Infinity,
  });

  const [param] = useSearchParams();
  const SeachValue = param.get("search");

  const nav = useNavigate();

  const CateGory = ["All", "반응형", "React", "참여율 100%"];

  return (
    <>
      <div className="grid grid-cols-3 gap-5 layout-center">
        {/* List */}
        <div className="col-span-3 flex items-center">
          <CateGoryButton CateGory={CateGory} type={"queryString"} />

          <Button onClick={() => nav("write")}>글쓰기</Button>
        </div>

        {!isLoading && isError && "error"}
        {!isLoading ? (
          <>
            {data.length === 0 && "등록된 프로젝트가 없습니다.."}
            {data.map((project) => {
              return (
                <ProjectListItem
                  project={project}
                  key={project.projectKey! + SeachValue}
                />
              );
            })}
          </>
        ) : (
          <>
            {/* 스켈레톤 */}
            <SkeletonPost listCnt={6} />
          </>
        )}
      </div>
    </>
  );
}
