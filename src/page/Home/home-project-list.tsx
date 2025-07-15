import { Button } from "@/components/ui/button";

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
    <div className="grid layout-center mt-5 md:mt-10">
      {/* 헤더 */}
      <div
        data-animate
        className="grid  grid-cols-1 md:grid-cols-[1fr_3fr_1fr] text-zinc-400 border-b border-white/30 pb-4"
      >
        <div className="hidden md:block  text-xs uppercase tracking-wider font-mono">
          Index
        </div>
        <div className="text-xs uppercase tracking-wider font-mono">
          Project
        </div>
        <div className="hidden md:block  text-xs uppercase tracking-wider font-mono text-right">
          Stack
        </div>
      </div>

      <div
        data-animate
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        {/* 프로젝트 목록 */}
        {projectlist.map((project, index) => (
          <div
            onClick={() => nav(`/project/${project.id}`)}
            key={index}
            className="group relative  py-10 cursor-pointer grid  md:grid-cols-[1fr_3fr_1fr] items-center border-b border-white/10   p-5  "
          >
            {/* 인덱스 */}
            <div className="hidden md:block font-mono text-3xl font-light text-zinc-500 transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* 메인 콘텐츠 */}
            <div className="grid gap-3">
              <h4 className="text-xl md:text-3xl mb-4  group-hover:text-teal-300  font-Montserrat font-light  transition-all duration-300 ">
                {project.title}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed max-w-[500px] text-muted-foreground group-hover:text-white/90 break-keep transition-all duration-300">
                {project.description}
              </p>
            </div>

            {/* 스택 정보 */}
            <div className="flex md:flex-col pt-5 md:pt-0 items-end gap-2">
              {project.project_meta_stack.map((e, idx) => {
                if (e.project_stack.type === "framework") {
                  return (
                    <span
                      key={`stack:${idx}`}
                      className="text-xs uppercase tracking-wider text-gray-300"
                    >
                      {e.project_stack.stack}
                    </span>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
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
