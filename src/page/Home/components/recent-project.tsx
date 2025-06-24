import StackBadge from "@/components/ui/stack-badge";
import SupabasePool from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { type ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectItemSkeleton from "./project-item-skeleton";

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
        .limit(2);
      return data as ProjectPostProps[];
    },
    staleTime: Infinity,
  });
  const nav = useNavigate();

  return (
    <div className="md:flex-row flex-col flex  gap-8">
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
                "flex flex-col  group cursor-pointer tr group  w-full  p-5 article-hover rounded-lg"
              )}
            >
              <h4 className="text-foreground flex text-xl items-center gap-3 group-hover:underline font-medium my-3 group-hover:text-indigo-200 transition-colors">
                <Box />
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
              <p className="text-xs md:text-sm text-secondary-foreground  line-clamp-2 my-4 leading-relaxed max-w-[500px] break-keep">
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
  );
}
