import { FaMagnifyingGlass } from "react-icons/fa6";
import { HashTag } from "@/style/commonStyle";
import {
  ProjectFadeinStyle,
  ProjectImgArea,
  ProjectCompany,
  ProjectDescription,
  ProjectItemHeaderStyle,
  ViewIconAnimation,
  ProjectItemWrap,
} from "@/features/project/ProjectListItemStyle";

import { ProjectPostProps } from "@/type/ProjectTypes";
import { IMG_URL } from "@/constants/apiUrl";
import { useEffect, useState } from "react";
import ProjectDetail from "./ProjectDetail";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ProjectListItem: React.FC<{ project: ProjectPostProps }> = ({
  project,
}) => {
  const [viewDetail, setViewDetail] = useState<boolean>(false);

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
        setViewDetail(false);
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

  return (
    <>
      {viewDetail && (
        <div
          className="fixed flex  items-center top-0 left-0 justify-center   overflow-y-scroll w-full h-screen  z-100"
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="h-full w-[80%]" style={{ marginBlockEnd: "20px" }}>
            <ProjectDetail id={+id} />
          </div>
        </div>
      )}

      <div className="cursor-pointer" onClick={() => setViewDetail(true)}>
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
          <ProjectItemHeaderStyle>{project.title}</ProjectItemHeaderStyle>

          {/* Company */}
          <p className="line-clamp-2 text-xs leading-6">{description}</p>
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
