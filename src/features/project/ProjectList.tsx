import ProjectListItem from "@/features/project/ProjectListItem";
import { ReactRouteDom } from "@/lib/lib";

import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useNavigate, useNavigation } from "react-router-dom";
import useStore from "@/store/zustandStore";

const { useSearchParams } = ReactRouteDom;

export default function ProjectList() {
  const login = useStore((state) => state.userAuth.login);
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

  return (
    <>
      <div className="grid grid-cols-3 gap-5 layout-center">
        {login && (
          <div className="col-span-3 flex items-center">
            <Button onClick={() => nav("write")}>글쓰기</Button>
          </div>
        )}

        {!isLoading && isError && "error"}
        {!isLoading ? (
          <>
            {data && data.length === 0 && "등록된 프로젝트가 없습니다.."}
            {data &&
              data.map((project, idx) => {
                return (
                  <ProjectListItem
                    project={project}
                    key={`projectList:${idx}`}
                  />
                );
              })}
          </>
        ) : (
          <>
            {/* 스켈레톤 */}
            <div />
          </>
        )}
      </div>
    </>
  );
}
