import StackBadge from "@/components/ui/stack-badge";
import SupabasePool from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { type ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ProjectItemSkeleton from "./project-item-skeleton";

import { Box, ChevronRight } from "lucide-react";

export default function RecentProject() {
  const { data: projectOne, isLoading } = useQuery<ProjectPostProps[]>({
    queryKey: ["RECENT_PROJECT"],
    queryFn: async () => {
      const { data } = await SupabasePool.getInstance()
        .from("project_meta")
        .select(
          `
            *,
            project_meta_stack(
              project_stack(*)
            )
                `
        )
        .order("id", { ascending: false })
        .limit(3);
      return data as ProjectPostProps[];
    },
    staleTime: Infinity,
  });
  const nav = useNavigate();

  return (
    <div className="layout-center grid md:grid-cols-2  pt-20">
      <div className=" animate-topIn ani-delay-0.5 opacity-0">
        <h1 className="text-3xl md:text-5xl font-Montserrat mt-3 mb-5 font-medium tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-2 ">
          WORK, <br></br>ARCHIVE
        </h1>

        <button
          className="border-white/60 hidden md:flex mt-10 gsap-contents z-10 border p-4 pl-5   justify-between gap-15 items-center text-xs article-hover  "
          onClick={() => nav("/about")}
        >
          DETAIL <ChevronRight size={12} />
        </button>
      </div>

      <div className=" flex-col flex space-y-3">
        {isLoading ? (
          <>
            {[1, 2].map((_, idx) => (
              <ProjectItemSkeleton key={`skeleton:${idx}`} />
            ))}
          </>
        ) : (
          projectOne?.map((project, idx) => {
            return (
              <div
                onClick={() => nav(`/project/${project.id}`)}
                key={`POST:${project.id}:${idx}`}
                className={cn(
                  "flex flex-col pb-3 group border-b border-white/20 group cursor-pointer tr group  w-full"
                )}
              >
                <h4 className="text-foreground flex text-xl items-center gap-3 group-hover:text-teal-300  border-l pl-3 font-medium my-3  transition-colors">
                  <Box className="group:hover:text-red-50" />
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  {project.project_meta_stack.map((e, idx) => {
                    if (e.project_stack.type === "framework") {
                      return (
                        <StackBadge key={`stack:${idx}`}>
                          {e.project_stack.stack}
                        </StackBadge>
                      );
                    }
                  })}
                </div>
                <p className="text-xs md:text-xs text-secondary-foreground/90  line-clamp-2 my-4 leading-relaxed max-w-[500px] break-keep">
                  {project.description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-foreground/40">
                    May 5, 2025
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
