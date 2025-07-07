export const EXPERIENCE = [
  {
    company: "개인 외주",
    dictionary: "Web Publisher & Web Developer",
    date: "22.12 ~ 24.09",
    workList: [
      {
        client: "닛코리",
        summary: ["일본 함박스테이크 전문점 Next.js 홈페이지 개설 "],
      },
      {
        client: "Ocare - ACADEMY",
        summary: [
          "사업 확장으로 인한 홍보 Next.js Full Route Cache 기반 홈페이지 개설",
        ],
        detailUrl: "115",
      },
      {
        client: "Care Plus",
        summary: ["청소전문 업체 웹사이트 디자인 & 기획 & 개발"],
        detailUrl: "112",
      },
      {
        client: "O-care Home Clean",
        summary: ["에어컨 업체 웹사이트 디자인 & 기획 & 개발 및 유지보수"],
        detailUrl: "111",
      },
      { client: "DOMO", summary: ["Unity eDM 뉴스레터 퍼블리싱"] },
      { client: "그린팟", summary: ["JLK 홍보 페이지 디자인 & 퍼블리싱"] },
    ],
  },
  {
    company: "애드아이티 기업부설연구소",
    dictionary:
      "사내 고객사 게시판 관리 및 개설\n나라 장터 및 SI 업무 ( 프론트 & 퍼블리싱 )\n 웹진 뉴스레터 등 웹 디자인 & 퍼블리싱 담당",
    date: "에이전시 / 선임연구원 / 20.06 - 22.11",
    workList: [
      {
        client: "강원랜드",
        summary: [
          "직원전용 모바일 커뮤니티 사용자 / 관리자 페이지 디자인 및 퍼블리싱",
          "Jmeter 성능 부하 테스트",
          "산출물 작성 ( 통합테스트 , 단위테스트 )",
        ],
        detailUrl: "16",
      },
      {
        client: "METEIMO",
        summary: [
          "사내 이벤트 툴 개발 (Jquery + php + mysql ) 및 디자인 &  기획",
        ],
        detailUrl: "60",
      },
      {
        client: "한국전파진흥원(KCA) - 다국어 웹진 구축",
        summary: [
          "Query String을 통한 다국어 웹진 개발 & 뉴스레터 발행",
          "Google 어낼리틱스 이용한 유입 통계",
        ],
        detailUrl: "13",
      },
      {
        client: "Smart-Runner 52시간 근태관리 리뉴얼",
        summary: ["Naver Works 기반 근태관리 시스템 디자인 & 퍼블리싱"],
      },
      {
        client: "공/사 기업 웹진 퍼블리싱 및 기획",
        summary: [
          "식약처, TIPA , 대한장애인체육회, NIA 등 웹진 UIUX 퍼블리싱 및 기획",
          "RFP 기간 내 유지보수 ",
        ],
      },
    ],
  },
];

export const CERTS = [
  "정보처리기사",
  "Sql developer",
  "네트워크 관리사 2급",
  "웹 디자인 개발 기능사",
  "그래픽스 운용 기능사",
  "정보기기 운용 기능사",
  "정보처리 기능사",
  "ITQ 1급",
  "GTQ 1급",
  "MOS MASTER",
  "AUTO CAD 2급",
  "워드 프로세스 1급",
];

export const EDUCATION = [
  {
    name: "방송통신대학교 컴퓨터과학과 4학년 재학 (편입)",
    year: "2021",
  },
  {
    name: "그린컴퓨터아트학원 웹앱 UX/UI 퍼블리싱 과정",
    year: "2019",
  },
  {
    name: "숭실대학교 일어일문학과 ",
    year: "2009",
  },
];

export const AWARD = [
  "서울시 그래픽스 부분 대상 (서울시 교육감상)",
  "전국 그래픽스 부분 은상 (숭실대 IT학장 상)",
];

export const SKILLS: Record<
  string,
  Array<{ title: string; description: string[] }>
> = {
  "Front-End": [
    {
      title: "Next.js / React",
      description: [
        "App Router 기반 구조에서 Client/Server 역할 구분 및 SEO 최적화",
        "Hydration, Suspense, Soft/Hard Navigation 등 렌더링 흐름에 대한 깊은 이해",
        "TanStack Query, zod, zustand, React Hook Form 등 주요 라이브러리 적극 활용",
        "컴포넌트 재사용성과 메모리 최적화를 고려한 구조 설계",
        "Next 캐싱기법을 활용한 트래픽, 랜더링 최소화",
      ],
    },
    {
      title: "JavaScript",
      description: [
        "프로미스, 실행 컨텍스트, 프로토타입 등 JS 엔진 동작 원리 숙지",
        "재귀, 탐색 기법을 활용한 트리 구조 처리 및 Set/Map 기반 최적화 구현",
      ],
    },
    {
      title: "TypeScript",
      description: [
        "제네릭, 유틸 타입(Pick, Infer 등)을 활용한 타입 안정성 확보",
        "공변성, 반공변성 이해를 통한 타입 유연성 확보",
      ],
    },
    {
      title: "Tailwind",
      description: ["Tailwind v4 및 shadcn/ui 조합으로 컴포넌트 기반 UI 구현"],
    },
  ],
  "Back-End": [
    {
      title: "Nest.js",
      description: [
        "Guard, Interceptor, DTO 기반 구조 설계",
        "TypeORM과 bcrypt, JWT를 활용한 인증/인가 처리",
        "DI 컨테이너, Module 구조 이해 및 Postman 기반 테스트 경험",
      ],
    },
  ],
  Database: [
    {
      title: "PostgreSQL / Drizzle ORM",
      description: [
        "정규화(최대 3NF), 관계형 설계, Join 및 트랜잭션 기반 CRUD 처리",
        "Drizzle ORM으로 타입 안전성과 코드 가독성을 높인 쿼리 구성",
      ],
    },
  ],
  DevOps: [
    {
      title: "Vercel / AWS",
      description: [
        "Vercel 기반 프로젝트 배포, 환경 변수 관리 및 Edge Function 활용",
        "S3 + CloudFront 캐시 전략, EC2 인스턴스 + Nginx , RDS + Mysql 경험 보유",
      ],
    },
  ],
  Design: [
    {
      title: "Figma / Adobe",
      description: [
        "Figma로 UI 설계 및 Adobe 툴을 통한 이미지 보정과 로고 제작",
      ],
    },
  ],
};
