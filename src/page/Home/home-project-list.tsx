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
import { useNavigate } from "react-router-dom";

export default function CarouselOrientation({
  projectlist,
}: {
  projectlist: ProjectPostProps[];
}) {
  const nav = useNavigate();

  return (
    <div className="grid grid-cols-3  gap-5 mx-20">
      {projectlist.map((project, index) => (
        <div
          key={index}
          data-animate
          className="gap-3 grid  bg-gradient-to-r  rounded-xl "
        >
          {/* <div
            className={cn(
              "aspect-[16/10] shadow-2xl shadow-teal-400/10 rounded-xl overflow-hidden bg-cover bg-top text-zinc-800 ",
              index % 2 && "order-1"
            )}
            style={{
              backgroundImage: `url(${`${IMG_URL}/${project.thumbnail}`})`,
            }}
          /> */}

          <div
            onClick={() => nav(`/project/${project.id}`)}
            key={`POST:${project.id}:${index}`}
            className={cn(
              "flex flex-col group gap-3 bg-violet-500   rounded-2xl p-10   group cursor-pointer tr group  w-full "
            )}
          >
            <h4 className=" flex text-2xl    items-center mb-10  group-hover:text-teal-300  font-Montserrat ">
              {project.title}
            </h4>
            <div className="flex gap-2 items-center ">
              {project.project_meta_stack.map((e, idx) => {
                if (e.project_stack.type === "framework") {
                  return (
                    <span
                      className="text-zinc-900 text-sm"
                      key={`stack:${idx}`}
                    >
                      {e.project_stack.stack}
                    </span>
                  );
                }
              })}
            </div>
            <p className="text-xs md:text-sm  line-clamp-3 leading-relaxed max-w-[500px] break-keep text-white ">
              {project.description}
            </p>
            <div className="flex items-center gap-3 ">
              <span className="text-sm text-zinc-00">May 5, 2025</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
