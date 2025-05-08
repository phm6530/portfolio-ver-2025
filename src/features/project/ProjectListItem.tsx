import { ProjectPostProps } from "@/type/ProjectTypes";
import { IMG_URL } from "@/constants/apiUrl";
import { useEffect, useRef, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import { Button } from "@/components/ui/button";
import { Link, X } from "lucide-react";
import StacBadge from "@/components/ui/stack-badge";

const ProjectListItem: React.FC<{ project: ProjectPostProps }> = ({
  project,
}) => {
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { thumbnail, company, hashtag, description, id, project_meta_stack } =
    project;
  const stack = project_meta_stack.flatMap((e) => e.project_stack);

  useEffect(() => {
    if (viewDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewDetail]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (viewDetail) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [viewDetail]);

  const closeModal = () => {
    ref.current?.classList.remove("animate-popup-in");
    ref.current?.classList.add("animate-popup-out");
    setTimeout(() => {
      setViewDetail(false);
    }, 300);
  };

  return (
    <>
      {/* Popup */}
      {viewDetail && (
        <div className="fixed inset-0 z-100 backdrop-blur-sm flex justify-center items-start overflow-y-auto">
          <div
            className="w-[80%] animate-popup-in my-20 bg-zinc-800 max-w-[1100px] relative"
            ref={ref}
          >
            <div className="absolute -right-[70px] w-[50px] h-full ">
              <div className="top-5 sticky">
                <Button
                  variant={"ghost"}
                  className="size-10 rounded-full bg-transparent border-foreground/50 border"
                  onClick={closeModal}
                >
                  <X />
                </Button>
              </div>
            </div>
            <ProjectDetail id={+id} closeModal={closeModal} />
          </div>
        </div>
      )}

      <div
        onClick={() => setViewDetail(true)}
        className="group bg-black/5  flex flex-col p-5 rounded-lg  backdrop-blur-sm  article-hover transform hover:-translate-y-1 h-full"
      >
        {/* 콘텐츠 영역 */}
        <div className="flex flex-col flex-1 p-5 ">
          {/* 타이틀 */}
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
            {project.title}
          </h3>

          {/* 설명 */}
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>

          {/* 프레임워크 태그 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stack.map((e, idx) =>
              e.type === "framework" ? (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-full  border border-indigo-500/30 text-indigo-200"
                >
                  {e.stack}
                </span>
              ) : null
            )}
          </div>

          {/* 액션 영역 */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-700/50 mt-auto">
            <span className="text-xs text-indigo-300 flex items-center gap-1 font-medium">
              view
              <svg
                className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5-5 5"
                />
              </svg>
            </span>

            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20 transition-all duration-300">
              <Link className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectListItem;
