import {
  Briefcase,
  Check,
  GraduationCap,
  MessageCircle,
  UserCheck,
  UserCheck2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CERTS, EDUCATION, EXPERIENCE, SKILLS } from "./about-contents";
import StackIconMapper from "@/components/shared/stack-iconmapper";
import { cn } from "@/lib/utils";
import PageMainText from "@/components/ui/page-main-text";

const AboutPage = () => {
  const nav = useNavigate();
  return (
    <>
      {/* <AnimatedBackgroundGlows /> */}
      {/* Main Content */}

      <div className="flex-1 max-w-3xl ">
        <UserCheck2 size={40} className="text-teal-300 mb-3" />

        {/* Page-text */}
        <PageMainText>
          ABOUT,<br></br>
          DEVELOPER
        </PageMainText>

        <div className="space-y-8 text-base text-white/90 leading-relaxed  animate-topIn ani-delay-0.3 opacity-0  break-keep">
          <p>
            퍼블리셔에서 프론트엔드로 전환이 아닌 역량의 확장이라는 생각으로
            <br></br>
            디자인과 기술을 아우르는 하이브리드 전문가로 성장하고 있습니다.
            <br></br>
            <br></br>
            사용자 중심의 직관적인 인터페이스 설계부터 최적화 방식으로<br></br>{" "}
            개발자와 사용자 모두의 경험을 중시합니다.
          </p>
          <p>
            디자이너와 개발자 사이의 가교 역할을 수행하며, 복잡한 기술적
            요구사항을 <br></br>시각적으로 뛰어난 결과물로 구현하는 독보적인
            역량을 바탕으로 팀과 프로젝트에 기여하겠습니다.
          </p>

          <div className="mt-10">
            <button
              className="article-hover p-5 cursor-pointer text-sm rounded-lg"
              onClick={() => nav("/board")}
            >
              응원의 한줄평 남기기
            </button>
          </div>
          <div className="flex flex-col">
            {/* Skills Section - Simplified */}
            <div className="pt-12 mt-12 border-t border-white/10">
              {/* Skill-list */}
              <div className="flex flex-col gap-6">
                {Object.keys(SKILLS).map((key, idx) => (
                  <div key={`about:${key}:${idx}`} className="space-y-6">
                    <h4
                      className={cn(
                        "text-lg font-medium text-indigo-300 ",
                        idx === 0 ? "mt-0" : "mt-10"
                      )}
                    >
                      {key}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                      {SKILLS[key].map((skill, sIdx) => (
                        <div
                          key={`${skill.title}:${idx}:${sIdx}`}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {StackIconMapper({
                              stackName: skill.title,
                              className: "[&>*]:fill-white!",
                            })}
                            <span className="text-base">{skill.title}</span>
                          </div>
                          <div className="space-y-2 pl-7">
                            {skill.description.map((desc, dIdx) => (
                              <p
                                key={`desc-${dIdx}`}
                                className="text-sm flex items-center gap-2"
                              >
                                <Check size={10} className="text-blue-300" />
                                <span className="text-secondary-foreground/90">
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
            <section className="pt-8 mt-8 border-t border-border">
              <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center">
                <GraduationCap
                  size={18}
                  className="mr-3 text-gray-500 border"
                />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {CERTS.map((cert, idx) => (
                  <div
                    key={`${cert}:${idx}`}
                    className="px-4 py-2 bg-[#000]/10 text-gray-300 border border-border text-xs md:text-sm"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section - Simplified */}
            <section className="pt-8 mt-8 border-t border-border">
              <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center ">
                <GraduationCap size={18} className="mr-3 " />
                Education
              </h3>
              <div className="space-y-3">
                {EDUCATION.map((edu, idx) => (
                  <div key={`${edu.year}:${idx}`} className="flex items-center">
                    {/* <span className="text-sm text-gray-500 w-20">
                        {edu.year}
                      </span> */}
                    <span>{edu.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* <section className="pt-8 mt-8 border-t border-border">
                <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center">
                  <Briefcase size={18} className="mr-3 " />
                  Experience
                </h3>
                <div className="space-y-10">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={`${exp.company}:${idx}`} className="space-y-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-medium">{exp.company}</h4>
                          <span className="text-sm text-indigo-200">
                            {exp.date}
                          </span>
                        </div>
                        <p className="text-sm  mt-1">{exp.dictionary}</p>
                      </div>
                      <div className="space-y-5 pl-2">
                        {exp.workList.map((work, wIdx) => (
                          <div
                            key={`work-${wIdx}`}
                            className="border-l-2 border-white/10 pl-4 py-1"
                          >
                            <p className="font-medium text-sm">{work.client}</p>
                            {work.summary.map((w) => {
                              return (
                                <p className="text-sm opacity-70 mt-1">{w}</p>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
