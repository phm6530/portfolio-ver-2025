import SubNav from "@/components/shared/sub-nav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import ProjectListItem from "./ProjectListItem";
import { AnimatedBackgroundGlows } from "@/page/about/tttt";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FILTER_LABEL = [
  { label: "전체보기", keyword: "all" },
  { label: "Next.js", keyword: "next" },
  { label: "React.js", keyword: "react" },
  { label: "TypeScript", keyword: "typescript" },
  { label: "Design", keyword: "design" },
] as const;

type FilterKeyword = (typeof FILTER_LABEL)[number]["keyword"];

const ProjectList = () => {
  const login = useStore((state) => state.userAuth.login);
  const [curFilter, setCurFilter] = useState<FilterKeyword>("all");

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
    <div className="flex-1 max-w-3xl">
      <div className="mb-12 animate-topIn ani-delay-0.2 opacity-0">
        <div className="text-xs tracking-wider text-white/60">Work archive</div>
        <div className="text-6xl font-light mt-4 bg-clip-text pb-4 bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
          Project<span className="text-red-300 font-semibold">'</span>
        </div>
      </div>
      {/* <div className="space-y-8 mb-10 text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
      <p>제 작업물을 공유합니다.</p>
    </div> */}

      <div className="mb-2 animate-topIn ani-delay-0.2 opacity-0">
        <div className=" flex gap-2">
          {FILTER_LABEL.map((e) => {
            return (
              <button
                key={`key:${e.keyword}`}
                className={cn(
                  "text-white/50  border-border border  items-center gap-2 rounded-full p-2 text-xs px-4",
                  e.keyword === curFilter && "border-indigo-200 text-indigo-200"
                )}
                onClick={() => setCurFilter(e.keyword)}
              >
                {e.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2  gap-3  ">
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
};

export default ProjectList;
