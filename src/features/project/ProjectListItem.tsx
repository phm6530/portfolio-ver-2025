import { cn } from "@/lib/utils";
import { ProjectPostProps } from "@/type/ProjectTypes";
import imgUrlMapper from "@/utils/imgUrl-mapping";

import { useNavigate } from "react-router-dom";

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
    <>
      <div
        onClick={() => nav(`${id}`)}
        className="group bg-muted/80 rounded-xl! flex flex-col overflow-hidden h-full transform hover:-translate-y-1 transition-all duration-300 article-hover"
      >
        {thumbnail && (
          <div
            className="w-full aspect-[16/7] "
            style={{
              backgroundImage: `url(${thumbnail ? imgUrlMapper({ thumbnail }) : null})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          />
        )}

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col flex-1  p-5 ">
          {/* 타이틀 */}
          <h3 className="text-xl  group-hover:text-indigo-200 transition-colors mb-3">
            {title}
          </h3>
          {/* 설명 */}
          <p className="text-[13px] break-keep line-clamp-3  leading-relaxed mb-5 opacity-80">
            {description}
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3  border-zinc-700/50 items-center">
              <p className="text-xs w-full text-foreground">주 사용스택</p>
              {stack.map((e, idx) => {
                return e.type === "framework" ? (
                  <span
                    key={idx}
                    className={cn(
                      "text-xs px-2.5 py-1 flex gap-2 items-centers rounded-full border border-indigo-500/30 text-indigo-200",
                      e.stack.toLocaleLowerCase().includes(curFilter) &&
                        "bg-red-200!"
                    )}
                  >
                    {e.stack}
                  </span>
                ) : null;
              })}
            </div>

            {/* <div className="flex flex-wrap gap-1.5 mt-auto pt-3  border-zinc-700/40 items-center">
              <p className="text-xs w-full  text-foreground">
                작업기간 / 유지보수 기간
              </p>
              <span className="text-xs px-2.5 py-1 flex gap-2 items-centers rounded-full border border-indigo-500/30 text-indigo-200">
                {DateUtils.getDurationDays(
                  start_date as string,
                  end_date as string
                )}
                일
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectListItem;
