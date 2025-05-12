import { Button } from "@/components/ui/button";
import { Briefcase, Code, GraduationCap, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackgroundGlows } from "./tttt";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import { CERTS, EDUCATION, EXPERIENCE, SKILLS } from "./about-contents";
import React from "react";
import StackIconMapper from "@/components/shared/stack-iconmapper";

const AboutPage = () => {
  const nav = useNavigate();
  return (
    <main
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(145, 126, 210, 0.15) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(143, 147, 247, 0.15) 0%, transparent 55%)",
      }}
      className="min-h-screen bg-gradient-to-l from-[#332d38] to-[#554e58] relative bg-fixed text-white flex flex-col"
    >
      <AnimatedBackgroundGlows />
      {/* Main Content */}
      <SidebarWrapper>
        <div className="flex-1 max-w-3xl ">
          <div className="mb-12 animate-topIn ani-delay-0.2 opacity-0 relative">
            <div className="text-xs uppercase tracking-wider text-white/60">
              DEV & Publisher
            </div>
            <div className="text-5xl font-semibold  mt-4 bg-clip-text bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
              About<span className="text-red-300 font-semibold">'</span>{" "}
              Developer
            </div>
            <div className="w-16 h-0.5 bg-white/20 mt-6"></div>
          </div>
          <div className="space-y-8 text-white/90 text-base leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
            <p>
              퍼블리셔 경험을 기반으로 프론트엔드 개발 영역으로 전문성을
              확장하고 있습니다. 사용자 중심의 직관적인 인터페이스 설계와
              최적화된 사용자 경험 구현에 집중하고 있습니다.
            </p>

            <p>
              기술적 도전을 마주할 때마다 창의적 해결책을 모색하며 성장합니다.
              유연한 사고방식으로 팀의 기술적 역량을 높이고, 혁신적인 디지털
              경험을 만드는 데 기여하고자 합니다.
            </p>

            <div className="mt-10">
              <Button
                onClick={() => nav("/board")}
                className="bg-indigo-300/10! article-hover  text-white  rounded-md text-sm p-5 px-7! "
              >
                <MessageCircle />
                방명록 한줄남기기
              </Button>
            </div>

            {/* Skills Section - Simplified */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center ">
                <Code size={18} className="mr-3 text-gray-200" />
                Stack
              </h3>

              {/* Skill-list */}
              <div className="flex flex-col gap-6">
                {Object.keys(SKILLS).map((key, idx) => (
                  <div key={`about:${key}:${idx}`} className="space-y-6">
                    <h4 className="text-lg font-medium ">{key}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {SKILLS[key].map((skill, sIdx) => (
                        <div
                          key={`${skill.title}:${idx}:${sIdx}`}
                          className="space-y-3"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {StackIconMapper({ stackName: skill.title })}
                            <span className="font-medium">{skill.title}</span>
                          </div>
                          <div className="space-y-2 pl-7">
                            {skill.description.map((desc, dIdx) => (
                              <p key={`desc-${dIdx}`} className="text-sm ">
                                {desc}
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
                <GraduationCap size={18} className="mr-3 text-gray-500" />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-3">
                {CERTS.map((cert, idx) => (
                  <div
                    key={`${cert}:${idx}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm"
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
                    <span className="text-sm text-gray-500 w-20">
                      {edu.year}
                    </span>
                    <span>{edu.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="pt-8 mt-8 border-t border-border">
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
            </section>
          </div>
        </div>
      </SidebarWrapper>
    </main>
  );
};

export default AboutPage;
