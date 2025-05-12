import { cn } from "@/lib/utils";
import { ProjectPostProps } from "@/type/ProjectTypes";
import { DateUtils } from "@/utils/dateUtil";

import { useNavigate } from "react-router-dom";
import DevSvg from "@/asset/project/code_2.svg?react";
import DesignSvg from "@/asset/3d/brush.svg?react";
import StackIconMapper from "@/components/shared/stack-iconmapper";
import imgUrlMapper from "@/utils/imgUrl-mapping";

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
        className="group relative rounded-xl p-6 grid md:grid-cols-[minmax(auto,250px)_1fr] overflow-hidden h-full hover:-translate-y-1 transition-all duration-300 article-hover bg-zinc-900/20 hover:bg-zinc-800/30"
      >
        {thumbnail && (
          <div
            className="md:w-full   rounded-xl relative bg-no-repeat md:block hidden"
            style={{
              backgroundImage: `url(${thumbnail ? imgUrlMapper({ thumbnail }) : null})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          ></div>
        )}

        {/* 콘텐츠 영역 */}
        <div className="flex flex-col flex-1 md:px-7 md:py-4 justify-between">
          <h3 className="text-xl  group-hover:text-indigo-200 transition-colors mb-3">
            {title}
          </h3>

          {/* 설명 */}
          <p className="text-[13px] break-keep line-clamp-3 leading-relaxed mb-5 text-muted-foreground">
            {description}
          </p>

          <div className="mt-auto  pt-3 border-t border-zinc-700/40 flex flex-col sm:flex-row gap-4 sm:justify-between">
            {/* 주요스킬 섹션 */}
            <div>
              <p className="text-xs font-medium text-zinc-400 mb-2">주요스킬</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((e, idx) => {
                  return e.type === "framework" ? (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-md transition-colors",
                        e.stack.toLocaleLowerCase().includes(curFilter)
                          ? "bg-indigo-400/10 text-indigo-200"
                          : "bg-zinc-800/100 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-300"
                      )}
                      title={e.stack}
                    >
                      <StackIconMapper
                        stackName={e.stack}
                        className="size-4 [&>*]:fill-current"
                      />
                      <span className="text-xs">{e.stack}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* 작업기간 섹션 */}
            <div className="mt-2 sm:mt-0">
              <p className="text-xs font-medium text-zinc-400 mb-2">작업기간</p>
              <div className="flex items-center text-sm text-indigo-200">
                {DateUtils.getDurationDays(
                  start_date as string,
                  end_date as string
                )}
                일
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectListItem;
