import React from "react";
import { Code, GraduationCap, MessageCircle, Briefcase } from "lucide-react";

// Mock data for demo purposes
const SKILLS = {
  Frontend: [
    {
      title: "React.js",
      description: ["컴포넌트 기반 UI 개발", "상태 관리 및 최적화"],
    },
    {
      title: "Next.js",
      description: ["서버사이드 렌더링", "정적 사이트 생성"],
    },
  ],
  Design: [
    {
      title: "Figma",
      description: ["UI/UX 디자인", "프로토타입 제작"],
    },
    {
      title: "Tailwind CSS",
      description: ["유틸리티 기반 스타일링", "반응형 디자인"],
    },
  ],
};

const CERTS = ["정보처리기사", "웹디자인기능사", "HTML5 프로페셔널"];

const EDUCATION = [
  { year: "2018-2022", name: "서울대학교 컴퓨터공학과" },
  { year: "2015-2018", name: "한국디지털미디어고등학교" },
];

const EXPERIENCE = [
  {
    company: "ABC 디지털",
    date: "2022-현재",
    dictionary: "프론트엔드 개발자",
    workList: [
      {
        client: "금융 서비스 플랫폼",
        summary: "React와 TypeScript를 활용한 웹 애플리케이션 개발",
      },
      {
        client: "전자상거래 솔루션",
        summary: "Next.js를 활용한 서버사이드 렌더링 구현",
      },
    ],
  },
  {
    company: "XYZ 스튜디오",
    date: "2020-2022",
    dictionary: "웹 퍼블리셔",
    workList: [
      {
        client: "기업 브랜드 사이트",
        summary: "반응형 웹 디자인 및 퍼블리싱",
      },
    ],
  },
];

// Mock function for Stack Icon Mapper
const StackIconMapper = ({ stackName }) => {
  if (stackName === "React.js")
    return <div className="w-5 h-5 bg-blue-500 rounded-full"></div>;
  if (stackName === "Next.js")
    return <div className="w-5 h-5 bg-black rounded-full"></div>;
  if (stackName === "Figma")
    return <div className="w-5 h-5 bg-purple-500 rounded-full"></div>;
  if (stackName === "Tailwind CSS")
    return <div className="w-5 h-5 bg-sky-500 rounded-full"></div>;
  return <div className="w-5 h-5 bg-gray-500 rounded-full"></div>;
};

const MinimalAboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            DEV & PUBLISHER
          </div>
          <h1 className="text-5xl font-light mt-4 text-gray-900">
            About Developer
          </h1>
          <div className="w-16 h-px bg-gray-300 mt-6"></div>
        </div>

        <div className="space-y-12 text-gray-700 text-base leading-relaxed">
          <div className="max-w-2xl">
            <p className="mb-4">
              퍼블리셔로서의 경험을 바탕으로 프론트엔드 개발자로의 전환을
              모색하고 있으며, 이를 통해 사용자 경험을 개선하고 더 나은 사용자
              인터페이스를 제공하는 데 기여하고자 합니다.
            </p>

            <p>
              새로운 도전을 즐기며, 기술적 문제 해결에 있어 유연한 접근을
              지향합니다. 이를 통해 조직의 기술적 성과를 끌어올릴 수 있는 기회를
              찾고자 도전하고 있습니다.
            </p>

            <div className="mt-8">
              <button className="bg-black text-white py-2 px-6 rounded-none hover:bg-gray-800 transition-colors flex items-center">
                <MessageCircle className="mr-2" size={16} />
                방명록 한줄남기기
              </button>
            </div>
          </div>

          {/* Skills Section */}
          <section className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center text-gray-700">
              <Code size={18} className="mr-3 text-gray-500" />
              Stack
            </h3>

            <div className="space-y-16">
              {Object.keys(SKILLS).map((key, idx) => (
                <div key={`about:${key}:${idx}`} className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-800">{key}</h4>
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
                            <p
                              key={`desc-${dIdx}`}
                              className="text-sm text-gray-600"
                            >
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
          </section>

          {/* Certifications Section */}
          <section className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center text-gray-700">
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

          {/* Education Section */}
          <section className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center text-gray-700">
              <GraduationCap size={18} className="mr-3 text-gray-500" />
              Education
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={`${edu.year}:${idx}`} className="flex items-center">
                  <span className="text-sm text-gray-500 w-20">{edu.year}</span>
                  <span>{edu.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="pt-8 mt-8 border-t border-gray-200">
            <h3 className="text-lg font-normal tracking-wider mb-8 flex items-center text-gray-700">
              <Briefcase size={18} className="mr-3 text-gray-500" />
              Experience
            </h3>
            <div className="space-y-10">
              {EXPERIENCE.map((exp, idx) => (
                <div key={`${exp.company}:${idx}`} className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-medium">{exp.company}</h4>
                      <span className="text-sm text-gray-500">{exp.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {exp.dictionary}
                    </p>
                  </div>
                  <div className="space-y-2 pl-2">
                    {exp.workList.map((work, wIdx) => (
                      <div
                        key={`work-${wIdx}`}
                        className="border-l-2 border-gray-200 pl-4 py-1"
                      >
                        <p className="font-medium text-sm">{work.client}</p>
                        <p className="text-sm text-gray-600">{work.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default MinimalAboutPage;
