export const EXPERIENCE = [
  {
    company: "개인",
    dictionary: "Web Publisher & Web Developer",
    date: "22.12 ~ 24.09",
    workList: [
      {
        client: "Ocare - ACADEMY",
        summary: ["사업 확장으로 인한 홍보 홈페이지 개설"],
      },
      {
        client: "케어플러스",
        summary: ["청소전문 업체 웹사이트 디자인 & 기획 & 개발"],
      },
      {
        client: "O-care 홈크린",
        summary: ["에어컨 업체 웹사이트 디자인 & 기획 & 개발 및 유지보수"],
      },
      { client: "DOMO", summary: ["Unity eDM 뉴스레터 퍼블리싱"] },
      { client: "그린팟", summary: ["JLK 홍보 페이지 디자인 & 퍼블리싱"] },
    ],
  },
  {
    company: "애드아이티 기업부설연구소",
    dictionary:
      "사내 서버, 시스템 관리 및 고객사 웹진 구축 & 웹 부분 전 담당 &  SI 업무 / 선임연구원",
    date: "20.06 - 22.11",
    workList: [
      {
        client: "스트라베이스",
        summary: ["MEDIA & TRAND 웹진 퍼블리싱 & 유지보수"],
      },
      {
        client: "강원랜드",
        summary: [
          "직원전용 모바일 커뮤니티 사용자 / 관리자 페이지 디자인 및 퍼블리싱",
          "Jmeter 성능 부하 테스트",
          "산출물 작성 ( 통합테스트 , 단위테스트 )",
        ],
      },
      {
        client: "METEIMO",
        summary: [
          "사내 이벤트 툴 개발 (Jquery + php + mysql ) 및 디자인 &  기획",
        ],
      },
      {
        client: "한국전파진흥원(KCA) - 다국어 웹진 구축",
        summary: [
          "Query String을 통한 다국어 웹진 개발 & 뉴스레터 발행",
          "Google 어낼리틱스 이용한 유입 통계",
        ],
      },
      {
        client: "Smart-Runner 52시간 근태관리 리뉴얼",
        summary: ["Naver Works 기반 근태관리 시스템 디자인 & 퍼블리싱"],
      },
      {
        client: "식약처 웹진",
        summary: ["퍼블리싱 & 유지보수"],
      },
      {
        client: "국회도서관 웹진",
        summary: ["퍼블리싱 & 유지보수"],
      },
      {
        client: "한국전파진흥원(KCA) All Digital 이벤트",
        summary: ["디자인 및 인증샷 이벤트 폼 개발"],
      },
      {
        client: "한국정보화진흥원(NIA) 6 ~ 11호 웹진",
        summary: ["PHP기반 웹진 리 디자인 및 퍼블리싱 매달 발행 유지보수"],
      },
      {
        client: "대한장애인체육회 뉴스레터 발행",
        summary: ["뉴스레터 퍼블리싱 / 모바일 & 이미지맵"],
      },
      {
        client: "중소기업기술정보진흥원(TIPA) 웹진 발행",
        summary: ["JAVA기반 웹진 유지보수"],
      },
    ],
  },
];

export const CERTS = [
  "정보처리기사",
  "Sql developer",
  "네트워크 관리사 2급",
  "웹 디자인 기능사",
  "정보처리 기능사",
  "정보기기 기능사",
  "그래픽스 운용 기능사",
  "ITQ 1급",
  "GTQ 1급",
  "MOS MASTER",
  "AUTO CAD 2급",
  "워드 프로세스 1급",
];

export const EDUCATION = [
  {
    name: "방송통신대학교 컴퓨터과학과 재학 (편입)",
    year: "2021",
  },
  {
    name: "그린컴퓨터아트학원 웹앱 UX/UI 퍼블리싱 과정",
    year: "2019",
  },
  {
    name: "숭실대학교 일어일문학과",
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
      title: "Next.js",
      description: [
        "Server/Client 역할 분담과 랜더링의 명확한 이해",
        "App Router 기반 구조 및 Meta Data 설정",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Next의 Soft/Hard Navigation을 이해하고, Fiber:Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
    {
      title: "React.js",
      description: [
        "최신 라이브러리에 대한 활용",
        "React hook form, ",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
    {
      title: "TypeScript",
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
      title: "JavaScript",
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
      title: "Scss",
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
      title: "Tailwind",
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
      title: "styled-components",
      description: [
        "Server/Client 컴포넌트 구분에 기반한 캐싱 전략으로 효율적인 렌더링 최적화",
        "App Router 기반 구조 및 Meta Data 설정을 통한 SEO 최적화",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
  ],
  "Back-End": [
    {
      title: "Nest",
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
      title: "Express",
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
      title: "Php",
      description: [
        "Server/Client 컴포넌트 구분에 기반한 캐싱 전략으로 효율적인 렌더링 최적화",
        "App Router 기반 구조 및 Meta Data 설정을 통한 SEO 최적화",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
  ],
  Database: [
    {
      title: "JavaScript",
      description: [
        "Server/Client 컴포넌트 구분에 기반한 캐싱 전략으로 효율적인 렌더링 최적화",
        "App Router 기반 구조 및 Meta Data 설정을 통한 SEO 최적화",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
  ],
  Design: [
    {
      title: "JavaScript",
      description: [
        "Server/Client 컴포넌트 구분에 기반한 캐싱 전략으로 효율적인 렌더링 최적화",
        "App Router 기반 구조 및 Meta Data 설정을 통한 SEO 최적화",
        "Server Actions, Full Route Cache, Data Cache를 활용한 데이터 재사용 및 트래픽 최소화",
        "TanStack Query의 Hydration Boundary로 클라이언트 트래픽 제어",
        "Soft/Hard Navigation을 이해하고, Suspense를 이용한 스트리밍 렌더링 구현",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리",
      ],
    },
  ],
};
