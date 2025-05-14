import StackBadge from "@/components/ui/stack-badge";
import SupabasePool from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentProject() {
  const { data: projectOne } = useQuery<ProjectPostProps[]>({
    queryKey: ["RECENT_PROJECT"],
    queryFn: async () => {
      const pool = SupabasePool.getInstance();
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
    <div className="flex flex-col gap-8">
      {projectOne?.map((project, idx) => {
        return (
          <div
            onClick={() => nav(`/project/${project.id}`)}
            key={`POST:${project.id}:${idx}`}
            className={cn(
              "flex flex-col  group cursor-pointer tr group  w-full  "
            )}
          >
            <h4 className="text-foreground flex text-lg items-center gap-3 group-hover:underline font-medium my-3 group-hover:text-indigo-200 transition-colors">
              <Box />
              {project.title}
              <div className="flex items-center gap-2">
                {project.project_meta_stack.map((e) => {
                  if (e.project_stack.type === "framework") {
                    return <StackBadge>{e.project_stack.stack}</StackBadge>;
                  }
                })}
              </div>
            </h4>
            <p className="text-xs md:text-xs text-foreground/70  line-clamp-3 mb-2 leading-relaxed max-w-[500px] break-keep">
              {project.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-foreground/40">
                May 5, 2025
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
