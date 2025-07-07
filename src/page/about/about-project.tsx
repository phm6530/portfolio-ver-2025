import { useNavigate } from "react-router-dom";
import { EXPERIENCE } from "./about-contents";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function AboutProjects() {
  const nav = useNavigate();
  return (
    <>
      {/* p-5 bg-zinc-800 rounded-xl */}

      <div className="space-y-13">
        {EXPERIENCE.map((exp, idx) => (
          <div key={`${exp.company}:${idx}`} className="space-y-4">
            <div className="flex flex-col mb-5">
              <div className="flex items-center gap-2">
                <h4 className="text-lg ">{exp.company}</h4>
                <span className="text-xs inline-block text-indigo-200/60">
                  {exp.date}
                </span>
              </div>
              <p className="text-sm mt-2  text-muted-foreground whitespace-pre-line leading-relaxed">
                {exp.dictionary}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {exp.workList.map((work, wIdx) => (
                <div
                  key={`work-${wIdx}`}
                  className={cn(
                    "gap-x-2 bg-zinc-950/40 p-5 rounded-lg",
                    work.detailUrl && "article-hover cursor-pointer group"
                  )}
                  {...(work.detailUrl && {
                    onClick: () => nav(`/project/${work.detailUrl}`),
                  })}
                >
                  <div className="w-full">
                    <div
                      className={cn(
                        work.detailUrl && "",
                        "font-medium text-sm md:text-base flex w-full items-center gap-2 "
                      )}
                    >
                      {work.client}{" "}
                      {work.detailUrl && (
                        <ChevronRight
                          className="opacity-50 group-hover:opacity-100"
                          size={14}
                        />
                      )}
                    </div>
                    <div className="mt-1 text-muted-foreground">
                      {work.summary.map((w, idx) => {
                        return (
                          <p
                            key={idx}
                            className="text-xs md:text-sm leading-relaxed"
                          >
                            - {w}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
