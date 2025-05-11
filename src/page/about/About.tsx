import StarAnimation from "@/component/animations/StarAnimation";
import SubNav from "@/components/shared/sub-nav";
import { Button } from "@/components/ui/button";
import StackBadge from "@/components/ui/stack-badge";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Code,
  GraduationCap,
  Hammer,
  MessageCircle,
  MessageSquareMore,
  Terminal,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { AnimatedBackgroundGlows } from "./tttt";

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
      <div className="grid grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
        <div>
          {/* SUbpage - Nav */}
          <SubNav />
        </div>

        <div className="flex-1 max-w-3xl ">
          {" "}
          <div className="mb-12 animate-topIn ani-delay-0.2 opacity-0 relative">
            <div className="text-xs uppercase tracking-wider text-white/60">
              DEV & Publisher
            </div>
            <div className="text-5xl font-light mt-4 bg-clip-text bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
              About<span className="text-red-300 font-semibold">'</span>{" "}
              Developer
            </div>
            <div className="w-16 h-0.5 bg-white/20 mt-6"></div>
          </div>
          <div className="space-y-8 text-white/90 text-base leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
            <p>
              퍼블리셔로서의 경험을 바탕으로 프론트엔드 개발자로의 전환을
              모색하고 있으며, <br></br>
              이를 통해 사용자 경험을 개선하고 더 나은 사용자 인터페이스를
              제공하는 데 기여하고자 합니다.
            </p>

            <p>
              새로운 도전을 즐기며, 기술적 문제 해결에 있어 유연한 접근을
              지향합니다. <br></br>이를 통해 조직의 기술적 성과를 끌어올릴 수
              있는 기회를 찾고자 도전하고 있습니다.
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
              <h3 className="text-lg  tracking-wider mb-5 flex gap-4  items-center text-indigo-200">
                <div className="size-7 border bg-indigo-200/10 flex items-center justify-center rounded-xl">
                  <Code size={15} className="text-white/80" />
                </div>
                <span className="bg-gradient-to-r">Stack</span>
              </h3>

              <div className="flex flex-col gap-6">
                <div className=" border-b pb-5">
                  <div className="text-lg text-white/90 font-medium mb-5">
                    Next.js ( v14 , v15 )
                  </div>
                  <div className="flex flex-col gap-7 mt-4">
                    <div className="space-y-2">
                      <div className="pl-3 relative border-l border-white/20">
                        <div className="text-white/80">Next-Cache 활용</div>
                        <div className="text-white/50 text-sm mt-1">
                          서버 구축 및 API 개발, 클라우드 인프라 관리
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="pl-3 relative border-l border-white/20">
                        <div className="text-white/80">
                          Node.js, Express, AWS
                        </div>
                        <div className="text-white/50 text-xs mt-1">
                          서버 구축 및 API 개발, 클라우드 인프라 관리
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="pl-3 relative border-l border-white/20">
                        <div className="text-white/80">Next-Cache 활용</div>
                        <div className="text-white/50 text-sm mt-1">
                          서버 구축 및 API 개발, 클라우드 인프라 관리
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="pl-3 relative border-l border-white/20">
                        <div className="text-white/80">Next-Cache 활용</div>
                        <div className="text-white/50 text-sm mt-1">
                          서버 구축 및 API 개발, 클라우드 인프라 관리
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    React
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Node.js, Express, AWS</div>
                      <div className="text-white/50 text-xs mt-1">
                        서버 구축 및 API 개발, 클라우드 인프라 관리
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Database
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">MongoDB, PostgreSQL</div>
                      <div className="text-white/50 text-xs mt-1">
                        NoSQL, SQL 데이터베이스 설계 및 최적화
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section - Simplified */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <h3 className="text-lg  tracking-wider mb-5 flex gap-4  items-center text-indigo-200">
                <div className="size-7 bg-indigo-200/10 flex items-center justify-center rounded-xl">
                  <GraduationCap size={15} className="text-white/80" />
                </div>
                <span className="bg-gradient-to-r">EDUCATION</span>
              </h3>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Frontend
                  </div>
                  <div className="space-y-4">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Next.js</div>
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>
                    </div>
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">React</div>
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Backend
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Node.js, Express, AWS</div>
                      <div className="text-white/50 text-xs mt-1">
                        서버 구축 및 API 개발, 클라우드 인프라 관리
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Database
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">MongoDB, PostgreSQL</div>
                      <div className="text-white/50 text-xs mt-1">
                        NoSQL, SQL 데이터베이스 설계 및 최적화
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <h3 className="text-lg  tracking-wider mb-5 flex gap-4  items-center text-indigo-200">
                <div className="size-7 bg-indigo-200/10 flex items-center justify-center rounded-xl">
                  <Briefcase size={15} className="text-white/80" />
                </div>
                <span className="bg-gradient-to-r">Experience</span>
              </h3>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Frontend
                  </div>
                  <div className="space-y-4">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Next.js</div>
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>
                    </div>
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">React</div>
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Backend
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Node.js, Express, AWS</div>
                      <div className="text-white/50 text-xs mt-1">
                        서버 구축 및 API 개발, 클라우드 인프라 관리
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Database
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">MongoDB, PostgreSQL</div>
                      <div className="text-white/50 text-xs mt-1">
                        NoSQL, SQL 데이터베이스 설계 및 최적화
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <h3 className="text-base uppercase tracking-wider mb-5 flex gap-3 items-center text-indigo-200">
                <Code size={20} />

                <span className="bg-gradient-to-r">SKILLS</span>
              </h3>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Frontend
                  </div>
                  <div className="space-y-4">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Next.js</div>
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        Server/Client 컴포넌트 구분에 기반한 계층 전략으로
                        초음직인 렌더링 최적화
                      </div>
                    </div>
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">React</div>
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>{" "}
                      <div className="text-white/50 text-xs mt-1">
                        기반 구조 및 Meta Data 설정을 통한 SEO 최적화
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Backend
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Node.js, Express, AWS</div>
                      <div className="text-white/50 text-xs mt-1">
                        서버 구축 및 API 개발, 클라우드 인프라 관리
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    Database
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">MongoDB, PostgreSQL</div>
                      <div className="text-white/50 text-xs mt-1">
                        NoSQL, SQL 데이터베이스 설계 및 최적화
                      </div>
                    </div>
                  </div>
                </div>
                Next.js
                <div>
                  <div className="text-base text-white/90 font-medium mb-3">
                    DevOps
                  </div>
                  <div className="space-y-2">
                    <div className="pl-3 relative border-l border-white/20">
                      <div className="text-white/80">Docker, CI/CD</div>
                      <div className="text-white/50 text-xs mt-1">
                        컨테이너화 및 자동화된 배포 파이프라인 구축
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
