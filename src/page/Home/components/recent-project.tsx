import SupabasePool from "@/lib/supabaseClient";

import { type ProjectPostProps } from "@/type/ProjectTypes";
import { useQuery } from "@tanstack/react-query";

import CarouselOrientation from "../home-project-list";
import { forwardRef } from "react";

const RecentProject = forwardRef(
  (_, ref: React.ForwardedRef<HTMLElement[]>) => {
    const { data: projectOne, isLoading } = useQuery<ProjectPostProps[]>({
      queryKey: ["RECENT_PROJECT"],
      queryFn: async () => {
        const { data } = await SupabasePool.getInstance()
          .from("project_meta")
          .select(
            `
            *,
            project_meta_stack(
              project_stack(*)
            )
                `
          )
          .order("id", { ascending: false })
          .limit(6);
        return data as ProjectPostProps[];
      },
      staleTime: Infinity,
    });

    return (
      <section
        ref={(el) => {
          if (el && ref && "current" in ref) {
            const arrayRef = ref.current!;
            if (!arrayRef.includes(el)) {
              arrayRef.push(el);
            }
          }
        }}
        className="h-screen w-screen absolute overflow-hidden z-11"
      >
        {/* BackGround */}
        <div
          data-bg
          className="w-screen h-screen bg-cover absolute pointer-events-none"
          style={{
            backgroundImage: `
      linear-gradient(#1d191ccc, rgb(24 22 22 / 55%)), url(/img/k1.jpg)
          `,
          }}
        />

        {/* Wrapper */}
        <div className="w-screen h-screen absolute">
          <div
            data-sec
            className="h-screen grid util-scrollbar overflow-y-auto   pt-40 md:pt-60 pb-30 w-full "
          >
            <div className=" mb-5  layout-center">
              <h1
                data-animate
                className="text-5xl  md:text-6xl font-black  font-Montserrat mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-5 "
              >
                WORK
              </h1>

              <div
                data-animate
                className="text-sm md:text-xl mb-5 mt-3  leading-relaxed"
              >
                <p className="  ">
                  저의 <span className="text-teal-300">"프로젝트 기록"</span>
                  입니다.
                </p>
                <p className="">
                  Next와 React를 학습하고 실전에 녹여낸 개인 프로젝트 입니다.
                </p>
              </div>
            </div>
            {isLoading ? (
              <> </>
            ) : (
              <CarouselOrientation projectlist={projectOne || []} />
            )}
          </div>
        </div>
      </section>
    );
  }
);

export default RecentProject;
