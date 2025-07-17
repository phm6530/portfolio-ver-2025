import { cn } from "@/lib/utils";
import { type ProjectPostProps } from "@/type/ProjectTypes";
import { DateUtils } from "@/utils/dateUtil";

import { useNavigate } from "react-router-dom";
import StackIconMapper from "@/components/shared/stack-iconmapper";
import imgUrlMapper from "@/utils/imgUrl-mapping";
import FadeInAnimation from "@/components/animations/FadeInAnimation";

const ProjectListItem: React.FC<{
  curFilter: string;
  project: ProjectPostProps;
}> = ({ curFilter, project }) => {
  const nav = useNavigate();
  const {
    title,
    thumbnail,
    company,
    hashtag,
    description,
    start_date,
    end_date,
    id,
    project_meta_stack,
  } = project;

  const stack = project_meta_stack.flatMap((e) => e.project_stack);

  return (
    <FadeInAnimation>
      <div
        onClick={() => nav(`${id}`)}
        className="group relative  overflow-hidden h-full   article-hover  "
      >
        {/* 콘텐츠 영역 */}
        <div className="grid grid-cols-[2fr_3fr] flex-1 p-3 gap-10">
          {" "}
          {thumbnail && (
            <div
              className="rounded-lg  relative bg-no-repeat md:block aspect-[16/13] "
              style={{
                backgroundImage: `url(${thumbnail ? imgUrlMapper({ thumbnail }) : null})`,
                backgroundPosition: "top",
                backgroundSize: "cover",
              }}
            ></div>
          )}
          <div className="flex flex-col">
            <h3 className="text-2xl font-Montserrat md:mt-5   group-hover:text-indigo-200 transition-colors ">
              {title}
            </h3>
            <div className="mt-auto  flex flex-col gap-4 sm:justify-between mb-4">
              {/* 주요스킬 섹션 */}
              <div>
                <div className="flex flex-wrap gap-4 items-center">
                  <p className="text-xs font-medium text-zinc-400 ">
                    주요 스킬
                  </p>
                  <div className="flex gap-1 items-center">
                    {stack.map((e, idx) => {
                      return e.type === "framework" ? (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-center gap-1  rounded-md transition-colors border p-1",
                            e.stack.toLocaleLowerCase().includes(curFilter)
                              ? "bg-indigo-400/10 text-indigo-200"
                              : " text-indigo-100 hover:bg-zinc-800/80 hover:text-zinc-300  border border-indigo-200/40"
                          )}
                          title={e.stack}
                        >
                          <StackIconMapper
                            stackName={e.stack}
                            className="size-4"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>

              {/* 작업기간 섹션 */}
              <div className="flex sm:mt-0  items-center gap-5">
                <p className="text-xs font-medium text-zinc-400 ">작업기간</p>
                <div className="flex items-center text-xs text-indigo-200">
                  {DateUtils.getDurationDays(
                    start_date as string,
                    end_date as string
                  )}
                  일
                </div>
              </div>
            </div>
            {/* 설명 */}
            <p className="text-[13px] break-keep line-clamp-3 leading-relaxed mb-5 text-indigo-100/80 ">
              {description}
            </p>
          </div>
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default ProjectListItem;
