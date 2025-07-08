import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import ProjectListItem from "./ProjectListItem";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { type ProjectPostProps } from "@/type/ProjectTypes";
import useStore from "@/store/zustandStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react";
import PageMainText from "@/components/ui/page-main-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const login = useStore((state) => state.userAuth.login);
  const nav = useNavigate();

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

  useGSAP(
    () => {
      const ani = document.querySelectorAll(".ani");
      gsap.from(ani, {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power.out",
      });
    },
    { scope: "", dependencies: [] }
  );

  return (
    <div className="flex-1 max-w-3xl">
      <div className="mb-6  ">
        <Box size={40} className="text-teal-300 mb-3" />
        <PageMainText>
          WORK,<br></br>
          ARCHIVE
        </PageMainText>
      </div>

      <div className="text-white/80 text-sm   mb-12 leading-6 break-keep ani">
        <p>외주, 토이 프로젝트, 직장에서 및 작업하였던 프로젝트 기록 입니다.</p>
        <p>
          외부로 공개된 참여한 프로젝트만 게시하며, 공개 불가한 프로젝트는
          기재하지 않습니다.
        </p>
      </div>

      <div className="mb-5 ani-delay-0.2  flex justify-between ani">
        <div className=" flex gap-2 flex-wrap">
          {FILTER_LABEL.map((e) => {
            return (
              <button
                key={`key:${e.keyword}`}
                className={cn(
                  "bg-transparent! text-muted-foreground flex gap-1 text-xs rounded-full border p-2 px-3 border-muted-foreground/30 cursor-pointer hover:border-indigo-200",
                  e.keyword === curFilter && "border-indigo-200 text-indigo-200"
                )}
                onClick={() => setCurFilter(e.keyword)}
              >
                {e.label}
              </button>
            );
          })}
        </div>
        <div className="col-span-full">
          {login && (
            <div className="col-span- flex items-center ">
              <Button
                className="text-xs"
                size={"sm"}
                onClick={() => nav("write")}
              >
                프로젝트 등록
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="grid md:grid-cols-2 grid-cols-1 mt-5 gap-3 "
        key={curFilter}
      >
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
          <div className="flex flex-col gap-10">
            {Array.from({ length: 6 }).map((_, idx) => {
              return (
                <div
                  key={`skeleton-${idx}`}
                  className="grid  md:grid-cols-[1fr_3fr] gap-5"
                >
                  <div className="bg-foreground/10  aspect-[16/9] animate-pulse rounded-xl" />
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="bg-foreground/10 animate-wiggle  h-3 rounded-full"></div>
                    <div className="bg-foreground/10 animate-wiggle w-2/3 h-3 rounded-full"></div>
                    <div className="bg-foreground/10 animate-wiggle w-1/2 h-3 rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
