import { ChevronRight, UserCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SKILLS } from "./about-contents";

import StackIconMapper from "@/components/shared/stack-iconmapper";
import { Button } from "@/components/ui/button";
import Certs from "./about-cert";
import AboutProjects from "./about-project";

const AboutPage = () => {
  const nav = useNavigate();
  return (
    <>
      {/* <AnimatedBackgroundGlows /> */}
      {/* Main Content */}

      <div className="flex-1 max-w-3xl ">
        <UserCheck2 size={40} className="text-teal-300" />

        <div className="mt-10 text-base text-white/90 leading-relaxed  animate-topIn ani-delay-0.3 opacity-0  break-keep">
          <h1 className="my-0 text-2xl md:text-3xl mb-5">
            프론트엔드 개발자 <strong>‘PHM’</strong>입니다. 🖐️{" "}
          </h1>
          <p className="break-keep">
            <span className="text-teal-300">Next.js</span>,{" "}
            <span className="text-teal-300">React</span>를 주력으로 개발하며,
            UI/UX와 기술을 아우르는 하이브리드 전문가로 성장하고 있습니다.
          </p>
          <p className="mb-5">
            퍼블리셔 경험을 기반으로 한 역량 확장형 전환을 통해, 사용자 중심의
            직관적인 인터페이스 설계부터 최적화된 개발까지, 개발자와 사용자
            모두의 경험을 중요하게 생각합니다
          </p>{" "}
          <div className="mt-10">
            <Button
              className="text-xs p-5 px-5!"
              size={"sm"}
              onClick={() => nav("/board")}
            >
              응원의 한줄평 남기기 <ChevronRight size={12} />
            </Button>{" "}
          </div>
          <div className="flex flex-col gap-25 mt-5">
            <div className="pt-12 mt-12  border-white/10">
              {/* Skill-list */}

              <div className="mb-5">
                <span className="text-teal-300 text-xs">SKILL</span>
                <h1 className="text-2xl font-bold">주요 사용 기술</h1>
              </div>

              <div className="flex flex-col gap-5">
                {Object.keys(SKILLS).map((key, idx) => (
                  <div key={`about:${key}:${idx}`} className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 items-start">
                      {SKILLS[key].map((skill, sIdx) => (
                        <div
                          key={`${skill.title}:${idx}:${sIdx}`}
                          className="space-y-3 "
                        >
                          <div className="space-y-3 bg-zinc-950/50 p-5 rounded-xl">
                            <div className="flex gap-2 items-center mb-5">
                              <StackIconMapper
                                stackName={skill.title}
                                className="size-5"
                              />
                              <span className="text-base">{skill.title}</span>
                              <span className="text-xs text-indigo-300">
                                {key}
                              </span>
                            </div>
                            {skill.description.map((desc, dIdx) => (
                              <p
                                key={`desc-${dIdx}`}
                                className="text-sm grid grid-cols-[auto_1fr] items-center gap-3"
                              >
                                <span className="bg-zinc-500 rounded-full inline-block size-1" />
                                <span className="text-muted-foreground text-xs md:text-sm">
                                  {desc}
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section - Simplified */}
            <section className="pt-8">
              <div className="mb-5">
                <span className="text-teal-300 text-xs">EDUCATION</span>
                <h1 className="text-2xl font-bold">교육 및 자격</h1>
              </div>
              {/* //certs */}
              <Certs />
            </section>

            <section className="pt-8 ">
              <div className="mb-8">
                <span className="text-teal-300 text-xs">WORK</span>
                <h1 className="text-2xl font-bold">프로젝트 및 업무경험</h1>
              </div>
              <AboutProjects />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
