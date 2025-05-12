import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import ProjectListItem from "./ProjectListItem";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProjectPostProps } from "@/type/ProjectTypes";

const FILTER_LABEL = [
  { label: "전체보기", keyword: "all" },
  { label: "Next.js", keyword: "next" },
  { label: "React.js", keyword: "react" },
  { label: "TypeScript", keyword: "typescript" },
  { label: "Design", keyword: "design" },
] as const;

type FilterKeyword = (typeof FILTER_LABEL)[number]["keyword"];

const ProjectList = () => {
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
    select: (data) => {
      if (curFilter === "all") {
        return data;
      }

      return data.filter((project: ProjectPostProps) => {
        return project.project_meta_stack.some((stackItem) => {
          const stackName = stackItem.project_stack.stack.toLowerCase();

          // Match based on filter keywords
          switch (curFilter) {
            case "next":
              return stackName.includes("next");
            case "react":
              return stackName.includes("react") || stackName.includes("next");
            case "typescript":
              return stackName.includes("typescript");
            case "design":
              return stackItem.project_stack.type === "style";
            default:
              return false;
          }
        });
      });
    },
  });

  return (
    <div className="flex-1 max-w-3xl">
      <div className="mb-6 animate-topIn ani-delay-0.2 opacity-0">
        <div className="text-xs uppercase tracking-widest text-white/50">
          Work Archive
        </div>
        <h1 className="font-extrabold text-6xl inline-block t-light mt-2 bg-gradient-to-l from-white to-indigo-200  text-transparent bg-clip-text pb-3">
          Project<span className="text-red-300 ">'</span>
        </h1>
      </div>

      <div className="text-white/80 text-sm  animate-topIn ani-delay-0.3 opacity-0 mb-12 leading-6">
        <p>외주, 토이 프로젝트 및 작업하였던 프로젝트 아카이브 입니다.</p>
        <p>외부로 공개된 참여한 프로젝트만 게시합니다</p>
      </div>

      <div className="mb-2 animate-topIn ani-delay-0.2 opacity-0">
        <div className=" flex gap-2 flex-wrap">
          {FILTER_LABEL.map((e) => {
            return (
              <button
                key={`key:${e.keyword}`}
                className={cn(
                  "text-white/50  border-border border  items-center gap-2 rounded-full py-2 md:p-3 text-xs px-2 md:px-4 flex",
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

      <div
        className="grid md:grid-cols-1 grid-cols-1 mt-5 gap-6 md:gap-3 animate-wiggle"
        key={curFilter}
      >
        {/* <div className="col-span-full">
          {login && (
            <div className="col-span- flex items-center">
              <Button onClick={() => nav("write")}>+ Add</Button>
            </div>
          )}
        </div> */}

        {!isLoading && isError && "error"}
        {!isLoading ? (
          <>
            {data && data.length === 0 && "등록된 프로젝트가 없습니다.."}
            {data && (
              <>
                {data.map((project, idx) => {
                  return (
                    <ProjectListItem
                      curFilter={curFilter}
                      project={project}
                      key={`projectList:${idx}`}
                    />
                  );
                })}
              </>
            )}
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
