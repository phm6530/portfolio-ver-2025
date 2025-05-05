import { FaMagnifyingGlass } from "react-icons/fa6";
import { HashTag } from "@/style/commonStyle";
import {
  ProjectCompany,
  ProjectItemHeaderStyle,
  ViewIconAnimation,
  ProjectItemWrap,
} from "@/features/project/ProjectListItemStyle";

import { ProjectPostProps } from "@/type/ProjectTypes";
import { IMG_URL } from "@/constants/apiUrl";
import { useEffect, useRef, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";

const ProjectListItem: React.FC<{ project: ProjectPostProps }> = ({
  project,
}) => {
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { thumbnail, company, hashtag, description, id } = project;

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

  useGSAP(() => {});

  return (
    <>
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

      <div className="cursor-pointer mb-10" onClick={() => setViewDetail(true)}>
        <div
          className="aspect-[16/9] bg-cover relative"
          style={{ backgroundImage: `url(${IMG_URL}/${thumbnail})` }}
        >
          <ViewIconAnimation className="aniTarget">
            <FaMagnifyingGlass />
          </ViewIconAnimation>
        </div>

        <ProjectItemWrap>
          {/* Header */}
          <ProjectCompany>{company}</ProjectCompany>
          <h1 className="mt-5 font-semibold text-lg mb-2">{project.title}</h1>

          {/* Company */}
          <p className="line-clamp-2 text-sm leading-6">{description}</p>
          <div>
            {hashtag &&
              hashtag.map((e: string, idx: number) => (
                <HashTag
                  className="hashTag"
                  key={`hash-${idx}`}
                  $page="project"
                >
                  # {e}
                </HashTag>
              ))}
          </div>
        </ProjectItemWrap>
      </div>
    </>
  );
};

export default ProjectListItem;
