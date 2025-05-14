import SupabasePool from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function RecentProject() {
  const { data: projectOne } = useQuery<ProjectPostProps[]>({
    queryKey: ["RECENT_PROJECT"],
    queryFn: async () => {
      const pool = SupabasePool.getInstance();
      const { data } = await pool
        .from("project_meta")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);
      return data as ProjectPostProps[];
    },
    staleTime: Infinity,
  });
  const nav = useNavigate();
  return (
    <div className="flex gap-2">
      {projectOne?.map((project, idx) => {
        return (
          <div
            onClick={() => nav(`/project/${project.id}`)}
            key={`POST:${project.id}:${idx}`}
            className={cn(
              "flex flex-col gap-2 group cursor-pointer   w-full p-5 border  rounded-lg article-hover"
            )}
          >
            <h4 className="text-foreground flex text-base items-center gap-3 font-medium my-3 group-hover:text-indigo-200 transition-colors">
              {project.title}
            </h4>
            <p className="text-xs md:text-xs text-foreground/70  line-clamp-3 mb-5 leading-relaxed max-w-[350px] break-keep">
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
