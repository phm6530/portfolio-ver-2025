import SupabasePool from "@/lib/supabaseClient";
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
    <>
      {projectOne?.map((project, idx) => {
        return (
          <div
            onClick={() => nav(`/project/${project.id}`)}
            key={`POST:${project.id}:${idx}`}
            className="flex flex-col gap-2 group cursor-pointer article-hover border-indigo-200 shadow-[0_5px_30px_rgba(99,102,241,0.25)]  p-5  bg-white/3 w-full rounded-lg"
          >
            <h4 className="text-white text-base font-medium mb-1 group-hover:text-indigo-200 transition-colors">
              {project.title}
            </h4>
            <p className="text-xs md:text-sm text-white/70  line-clamp-3 mb-5 leading-relaxed">
              {project.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40">May 5, 2025</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
