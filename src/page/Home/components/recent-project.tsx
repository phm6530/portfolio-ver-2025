import StackBadge from "@/components/ui/stack-badge";
import SupabasePool from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { type ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProjectItemSkeleton from "./project-item-skeleton";
import { Box } from "lucide-react";
import { IMG_URL } from "@/constants/apiUrl";
import CarouselOrientation from "../home-project-list";

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
        .limit(6);
      return data as ProjectPostProps[];
    },
    staleTime: Infinity,
  });
  const nav = useNavigate();

  return (
    <div className=" grid  pt-40 md:pt-40 pb-30 w-full">
      <div className="layout-center animate-topIn ani-delay-0.5 opacity-0 mb-10">
        <h1
          data-animate
          className="text-5xl font-bold  md:text-6xl font-Montserrat mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-2 "
        >
          PROJECT
        </h1>

        <div data-animate className="text-xs md:text-lg mb-5 mt-3">
          <p className="  leading-relaxed ">
            저의 <span className="text-teal-500">"프로젝트 기록"</span>
            입니다.
          </p>
          <p className="">
            Next와 React를 학습하고 실전에 녹여낸 개인 프로젝트 입니다.
          </p>
        </div>
      </div>
      {isLoading ? <> </> : <CarouselOrientation projectlist={projectOne} />}
    </div>
  );
}
