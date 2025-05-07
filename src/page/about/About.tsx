import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlineWork } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { cn } from "@/lib/utils";

// Constants
const CERTS = [
  "정보처리기사",
  "웹디자인기능사",
  "컴퓨터그래픽스운용기능사",
  "GTQ 1급",
];
const EDUCATION = [
  { name: "한국방송통신대학교 편입 (컴퓨터과학과)" },
  { name: "숭실대학교 (일어일문학과)" },
];

const SKILLS = [
  {
    title: "Next.js",
    description: [
      "Server/Client 컴포넌트 구분에 기반한 캐싱 전략으로 효율적인 렌더링 최적화",
      "App Router 기반 구조 및 Meta Data 설정을 통한 SEO 최적화",
      "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
      "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
      "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
      "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
    ],
  },
  {
    title: "React.js",
    description: [
      "Server Component, Client Component의 경계선과 Hydurtaion을 이해합니다.",
      "ㅅㄷㄴㅅ",
    ],
  },
  {
    title: "TypeScript",
    description: [
      "Server Component, Client Component의 경계선과 Hydurtaion을 이해합니다.",
      "ㅅㄷㄴㅅ",
    ],
  },
  {
    title: "JavaScript",
    description: [
      "Server Component, Client Component의 경계선과 Hydurtaion을 이해합니다.",
      "ㅅㄷㄴㅅ",
    ],
  },
  {
    title: "JavaScript",
    description: [
      "Server Component, Client Component의 경계선과 Hydurtaion을 이해합니다.",
      "ㅅㄷㄴㅅ",
    ],
  },
];
const EXPERIENCE = [
  {
    company: "현 직장",
    date: "2018-현재",
    workList: [
      {
        work: "홈페이지 운영 및 유지보수",
        summary: [
          "수십개의 홈페이지 운영 및 관리",
          "Next.js 기반 CMS 시스템 구축",
          "데이터 시각화 및 대시보드 개발",
        ],
      },
    ],
  },
];

// HashTag component for certificates and education
const HashTag = ({ children }) => (
  <span className="inline-block px-3 py-1.5 mr-2 mb-2 text-xs rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/30">
    {children}
  </span>
);

// Section Title component
const SectionTitle = ({ icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className="w-5 h-5 rounded-sm bg-indigo-500/20 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl text-indigo-200 tracking-wide">{title}</h3>
  </div>
);

// Simple background component
const SimpleBackground = ({ imgSrc, children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-zinc-950">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-bottom opacity-40"
        style={{
          backgroundImage: `url(${imgSrc})`,
          animation: "opacity .5s ease-out forwards",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950/90" />
      </div>

      {/* 별똥별 효과 (간소화) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white opacity-70 rounded-full"
            style={{
              width: "2px",
              height: "2px",
              top: `${Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 3px 1px rgba(255, 255, 255, 0.5)",
              animation: `shootingStar ${3 + i}s ${i * 2}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function About() {
  return (
    <SimpleBackground imgSrc="/vanner/vanner_2.jpg">
      <div className="layout-center pt-32 pb-20">
        {/* 헤더 소개 섹션 */}
        <div className="mb-20">
          <div className="text-xs text-white/40 tracking-wider mb-2">
            DEV & Publisher
          </div>

          <h1 className="text-5xl font-light mb-1">
            About
            <span className="text-indigo-400">'</span>
          </h1>

          <h2 className="text-6xl font-semibold text-white mb-6">Developer</h2>

          <div className="mt-8 max-w-2xl space-y-4 text-white/70 ">
            <p className="text-base leading-7">
              혼자서 능동적으로 해결하였던 문제 점들과 퍼블리셔로서의 경험을
              바탕으로 프론트엔드 개발자로의 전환을 모색하고 있으며, 이를 통해
              사용자 경험을 개선하고 더 나은 사용자 인터페이스를 제공하는 데
              기여하고자 합니다. 새로운 도전을 즐기며, 기술적 문제 해결에 있어
              유연한 접근을 지향합니다. 이를 통해 조직의 기술적 성과를 끌어올릴
              수 있는 기회를 찾고자 도전하고 있습니다.
            </p>
          </div>

          <div className="mt-10 flex gap-4 border-b pb-10 border-border">
            <button className="rounded-full size-10 bg-transparent border border-white/20 hover:border-indigo-500/70 transition-colors flex items-center justify-center">
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-2h2v2h-2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.35-.43.58-.79.58-.05 0-.1 0-.14-.01-.44-.08-.74-.49-.66-.93.42-2.28 2.67-3.65 4.85-3.03 1.24.35 2.28 1.35 2.67 2.58.42 1.36-.08 2.74-1.18 3.71z" />
              </svg>
            </button>
            <button className="rounded-full size-10 bg-transparent border border-white/20 hover:border-indigo-500/70 transition-colors flex items-center justify-center">
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </button>
            <button className="rounded-full size-10 bg-transparent border border-white/20 hover:border-indigo-500/70 transition-colors flex items-center justify-center">
              <svg
                className="w-5 h-5 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.665 16.811c-1.092 1.92-3.55 3.089-6.396 3.089-2.037 0-3.883-.63-5.166-1.658l.177.738C8.457 19.496 8.91 20 9.448 20H19c.552 0 1-.371 1-.828 0-1.058-.07-2.03-.335-2.904v.544zM19 22H9.448C7.908 22 6.695 20.957 6.557 19.517L4.343 6H3c-.552 0-1-.448-1-1s.448-1 1-1h2c.456 0 .848.32.946.758l.514 2.242H21c.479 0 .89.346.978.82.951 5.158-1.078 11.249-2.978 14.18zm-.167-11H6.044l1.5 6.5c.846 1.1 2.32 1.8 3.89 1.8 2.021 0 3.928-.889 4.792-2.262.715-1.14 1.12-2.767 1.279-4.38.052-.53.072-1.068.062-1.603l.266-.055z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 스킬 섹션 */}
        <div className="mb-20">
          <SectionTitle
            icon={
              <AiFillSafetyCertificate className="text-indigo-400 text-xs" />
            }
            title="SKILLS"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map((skill, idx) => (
              <div key={`${skill.title}:${idx}`} className="group ">
                <div className="flex items-start">
                  <span className="text-indigo-200 text-sm mr-2">
                    {(idx + 1).toString().padStart(2, "0")}.
                  </span>
                  <div>
                    <h4 className="text-lg font-medium mb-3 group-hover:text-indigo-300 transition-colors">
                      {skill.title}
                    </h4>

                    {skill.description.map((e, idx) => (
                      <p
                        key={`key-${idx}`}
                        className="text-white/80 text-sm mt-1 grid grid-cols-[auto_1fr] items-center gap-3"
                      >
                        <span className="size-1 bg-indigo-300 rounded-full" />
                        <span>{e}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 교육 및 자격증 섹션 */}
        <div className="mb-20">
          <SectionTitle
            icon={<IoSchool className="text-indigo-400 text-xs" />}
            title="EDUCATION & CERTIFICATES"
          />

          <div className="flex flex-wrap mb-4">
            {EDUCATION.map((edu, idx) => (
              <HashTag key={`edu-${idx}`}>{edu.name}</HashTag>
            ))}
          </div>

          <div className="flex flex-wrap">
            {CERTS.map((cert, idx) => (
              <HashTag key={`cert-${idx}`}>{cert}</HashTag>
            ))}
          </div>
        </div>

        {/* 경력 섹션 */}
        <div>
          <SectionTitle
            icon={<MdOutlineWork className="text-indigo-400 text-xs" />}
            title="EXPERIENCE"
          />

          {EXPERIENCE.map((exp, idx) => (
            <div key={`exp-${idx}`} className="flex gap-6">
              <div className="w-20 h-20 bg-zinc-900/80 border border-zinc-800 rounded flex-shrink-0 flex flex-col items-center justify-center">
                <span className="text-white/70 text-xs">{exp.date}</span>
              </div>

              <div>
                <h4 className="text-xl font-medium text-white mb-2">
                  {exp.company}
                </h4>
                <p className="text-white/80 mb-3">{exp.workList[0].work}</p>
                <ul className="space-y-2">
                  {exp.workList[0].summary.map((item, itemIdx) => (
                    <li
                      key={`item-${itemIdx}`}
                      className="text-white/60 text-sm flex items-center"
                    >
                      <span className="text-indigo-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 방명록 버튼 */}
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-transparent border border-indigo-500/50 text-white/90 text-sm hover:bg-indigo-500/10 transition-colors group">
            <span>방명록에 응원 한줄 남기기</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7L18 12M18 12L13 17M18 12H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </SimpleBackground>
  );
}
