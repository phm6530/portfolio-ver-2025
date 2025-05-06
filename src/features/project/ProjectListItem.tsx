import { ProjectPostProps } from "@/type/ProjectTypes";
import { IMG_URL } from "@/constants/apiUrl";
import { useEffect, useRef, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import { Button } from "@/components/ui/button";
import { Link, X } from "lucide-react";
import { useGSAP } from "@gsap/react";

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
        className="group  relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl dark:hover:shadow-indigo-500/20 hover:shadow-indigo-500/10 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gradient-to-b from-gray-50 to-white border dark:border-white/10 border-gray-200 "
      >
        <div className="w-full sm:h-64 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
            style={{
              backgroundImage: `url(${IMG_URL}/${project.thumbnail})`,
            }}
          />
          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t dark:from-gray-900 dark:via-gray-900/80 from-white via-white/80 to-transparent opacity-70" />
        </div>

        {/* 콘텐츠 영역 */}
        <div className="relative z-10 p-6 -mt-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {stack.map((e, idx) => {
              if (e.type !== "framework") return;
              return (
                <span
                  key={`stack-${idx}`}
                  className="dark:bg-indigo-800/80 border bg-indigo-300 backdrop-blur-sm dark:border-indigo-400/50 border-indigo-300 dark:text-indigo-200 text-indigo-400 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {e.stack}
                </span>
              );
            })}
          </div>

          {/* 프로젝트 제목 및 설명 */}
          <h1 className="text-lg font-bold dark:text-white text-gray-800 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300 mb-3">
            {project.title}
          </h1>
          <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed line-clamp-3 dark:group-hover:text-gray-300 group-hover:text-gray-900 transition-colors duration-300">
            {project.description}
          </p>

          {/* 하단 액션 영역 */}
          <div className="mt-2 pt-2 border-t dark:border-white/5 border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-600 dark:group-hover:text-indigo-300 group-hover:text-indigo-600 transition-all duration-300">
              <span className="text-xs">자세히 보기</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            {/* 시각적 요소 추가 */}
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-sm border dark:border-white/5 border-black/5 group-hover:scale-110 transition-transform duration-300">
              <Link className="h-5 w-5 dark:text-indigo-300 text-indigo-600" />
            </div>
          </div>

          {/* 호버 아웃라인 효과 */}
          <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-hover:border-indigo-500/50 pointer-events-none transition-all duration-300" />
        </div>
      </div>

      {/* <div className="cursor-pointer mb-10 ">
        <ViewIconAnimation className="aniTarget">
          <FaMagnifyingGlass />
        </ViewIconAnimation>

        <ProjectItemWrap></ProjectItemWrap>
      </div> */}
    </>
  );
};

export default ProjectListItem;
