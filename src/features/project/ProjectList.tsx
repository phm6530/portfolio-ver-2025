import SubNav from "@/components/shared/sub-nav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/zustandStore";
import { useQuery } from "@tanstack/react-query";
import { requestHandler } from "@/utils/apiUtils";
import SupabasePool from "@/lib/supabaseClient";
import ProjectListItem from "./ProjectListItem";
import { AnimatedBackgroundGlows } from "@/page/about/tttt";

const ProjectList = () => {
  const login = useStore((state) => state.userAuth.login);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      return await requestHandler(async () => {
        const rows = await SupabasePool.getInstance()
          .from("project_meta")
          .select(
            `
            *,
            project_meta_stack(
              project_stack(*)
            )
          `
          )
          .order("id", { ascending: false });

        if (rows.error || !rows.data) {
          throw new Error(`요청 실패 : ${rows.error.message}`);
        }

        return rows;
      });
    },
    staleTime: Infinity,
  });

  const nav = useNavigate();

  return (
    <main
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(145, 126, 210, 0.15) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(143, 147, 247, 0.15) 0%, transparent 55%)",
      }}
      className="min-h-screen bg-gradient-to-l from-[#332d38] to-[#95fff4] relative bg-fixed text-white flex flex-col"
    >
      <AnimatedBackgroundGlows />
      {/* <StarAnimation /> */}

      <div className="grid grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
        <div>
          {/* SUbpage - Nav */}
          <SubNav />
        </div>

        <div className="flex-1 max-w-3xl">
          {" "}
          <div className="mb-12 animate-topIn ani-delay-0.2 opacity-0">
            <div className="text-xs uppercase tracking-wider text-white/60">
              DEV & Publisher
            </div>
            <div className="text-6xl font-light mt-4 bg-clip-text pb-4 bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
              Project<span className="text-red-300 font-semibold">'</span>{" "}
            </div>
            {/* <div className="w-16 h-0.5 bg-white/20 mt-6"></div> */}
          </div>
          {/* <div className="space-y-8 mb-10 text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
            <p>
              퍼블리셔로서의 경험을 바탕으로 프론트엔드 개발자로의 전환을
              모색하고 있으며, <br></br>
              이를 통해 사용자 경험을 개선하고 더 나은 사용자 인터페이스를
              제공하는 데 기여하고자 합니다.
            </p>
          </div> */}
          <div className="mb-2 animate-topIn ani-delay-0.2 opacity-0">
            <div className="my-4 pt-3 flex gap-5">
              <button className="text-sm text-indigo-200 border-b-2 pb-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18"
                  />
                </svg>
                전체보기
              </button>
              <button className="text-sm border-b-2 border-transparent pb-2 flex items-center gap-2 hover:text-indigo-200 transition-all duration-300">
                Next.js
              </button>
              <button className="text-sm border-b-2 border-transparent pb-2 flex items-center gap-2 hover:text-indigo-200 transition-all duration-300">
                React
              </button>
              <button className="text-sm border-b-2 border-transparent pb-2 flex items-center gap-2 hover:text-indigo-200 transition-all duration-300">
                Full Stack
              </button>
              <button className="text-sm border-b-2 border-transparent pb-2 flex items-center gap-2 hover:text-indigo-200 transition-all duration-300">
                Single
              </button>
              <button className="text-sm border-b-2 border-transparent pb-2 flex items-center gap-2 hover:text-indigo-200 transition-all duration-300">
                Team
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2  gap-3  ">
            <div className="col-span-full">
              {login && (
                <div className="col-span- flex items-center">
                  <Button onClick={() => nav("write")}>+ Add</Button>
                </div>
              )}
            </div>

            {!isLoading && isError && "error"}
            {!isLoading ? (
              <>
                {data && data.length === 0 && "등록된 프로젝트가 없습니다.."}
                {data &&
                  data.map((project, idx) => {
                    return (
                      <ProjectListItem
                        project={project}
                        key={`projectList:${idx}`}
                      />
                    );
                  })}
              </>
            ) : (
              <>
                {/* 스켈레톤 */}
                {Array.from({ length: 6 }).map((_, idx) => {
                  return (
                    <div key={`skeleton-${idx}`}>
                      <div className="bg-foreground/10  aspect-[16/9] animate-pulse " />
                      <div className="flex flex-col gap-3 mt-4">
                        <div className="bg-foreground/10 animate-wiggle w-[100px] h-3 rounded-full"></div>
                        <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
                        <div className="bg-foreground/10 animate-wiggle w-2xs h-3 rounded-full"></div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectList;
