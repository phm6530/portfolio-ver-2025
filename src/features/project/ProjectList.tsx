import ProjectListItem from "@/features/project/ProjectListItem";
import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/zustandStore";

export default function ProjectList() {
  const login = useStore((state) => state.userAuth.login);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await requestHandler(async () => {
        const rows = await SupabasePool.getInstance()
          .from("project_meta")
          .select(
            `
            *,
            project_meta_stack(
              project_stack(*)
            )
          `
          )
          .order("id", { ascending: false });

        if (rows.error || !rows.data) {
          throw new Error(`요청 실패 : ${rows.error.message}`);
        }

        return rows;
      });
    },
    staleTime: Infinity,
  });

  const nav = useNavigate();

  return (
    <div className="">
      <div className="layout-center flex gap-2">
        <Button variant={"outline"} className="bg-orange-700!">
          Next.js
        </Button>
        <Button variant={"outline"}>React</Button>
        <Button variant={"outline"}>Design</Button>
        <Button variant={"outline"}>Publishing</Button>
      </div>
      <div className="grid grid-cols-3 gap-6 layout-center ">
        <div className="col-span-full">
          {login && (
            <div className="col-span- flex items-center">
              <Button onClick={() => nav("write")}>+ Add</Button>
            </div>
          )}
        </div>

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
            {Array.from({ length: 6 }).map((_, idx) => {
              return (
                <div key={`skeleton-${idx}`}>
                  <div className="bg-foreground/10  aspect-[16/9] animate-pulse " />
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="bg-foreground/10 animate-wiggle w-[100px] h-3 rounded-full"></div>
                    <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
                    <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
