import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StackBadge from "@/components/ui/stack-badge";
import { IMG_URL } from "@/constants/apiUrl";
import { cn } from "@/lib/utils";
import { ProjectPostProps } from "@/type/ProjectTypes";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CarouselOrientation({
  projectlist,
}: {
  projectlist: ProjectPostProps[];
}) {
  const nav = useNavigate();

  return (
    <div className="grid layout-center mt-10">
      {/* 헤더 */}
      <div
        data-animate
        className="grid grid-cols-[1fr_3fr_1fr] text-zinc-500 border-b border-white/20 pb-4"
      >
        <div className="text-xs uppercase tracking-wider font-mono">Index</div>
        <div className="text-xs uppercase tracking-wider font-mono">
          Project
        </div>
        <div className="text-xs uppercase tracking-wider font-mono text-right">
          Stack
        </div>
      </div>

      {/* 프로젝트 목록 */}
      {projectlist.map((project, index) => (
        <div
          data-animate
          onClick={() => nav(`/project/${project.id}`)}
          key={index}
          style={{
            backdropFilter: "blur(10px)",
          }}
          className="group relative  py-12 cursor-pointer grid grid-cols-[1fr_3fr_1fr] items-center border-b border-white/10   p-5  "
        >
          {/* 인덱스 */}
          <div className="font-mono text-3xl font-light text-zinc-500 transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* 메인 콘텐츠 */}
          <div className="grid gap-3">
            <h4 className="text-3xl md:text-4xl mb-4  group-hover:text-teal-300 font-Montserrat font-light  transition-all duration-300 ">
              {project.title}
            </h4>
            <p className="text-sm leading-relaxed max-w-[500px] text-muted-foreground group-hover:text-white/90 break-keep transition-all duration-300">
              {project.description}
            </p>
          </div>

          {/* 스택 정보 */}
          <div className="flex flex-col items-end gap-2">
            {project.project_meta_stack.map((e, idx) => {
              if (e.project_stack.type === "framework") {
                return (
                  <span
                    key={`stack:${idx}`}
                    className="text-xs font-mono uppercase tracking-wider text-zinc-400  transition-colors duration-300"
                  >
                    {e.project_stack.stack}
                  </span>
                );
              }
            })}
          </div>
        </div>
      ))}
      <div className="mt-10" data-animate>
        <Button
          className="text-xs p-6! px-5! flex gap-10"
          size={"sm"}
          onClick={() => nav("/project")}
        >
          자세히보기 <ChevronRight size={12} />
        </Button>{" "}
      </div>
    </div>
  );
}
