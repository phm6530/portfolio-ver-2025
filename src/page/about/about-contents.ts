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
  "웹 디자인 개발 기능사",
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
        "Full Route Cache, Data Cache, Request Cache를 활용한 데이터 재사용하며 Hydration을 깊이 이해하고 TanStack Query의 Hydration Boundary로 서버 인스턴스 수화를 통한 트래픽 제어 및 최소화",
        "App Router 기반 구조 및 SEO 최적화와 Client, Server의 명확한 구분과 이해",
        "Next의 Soft/Hard Navigation을 이해하고, Fiber:Suspense를 이용한 스트리밍 렌더와 Dynamic 렌더를 통한 상황에 따른 역할 할당",
        "Middleware를 통한 권한 체크 및 조건부 리다이렉션 처리나 레퍼러 체크",
        "Server Action과 Next API를 통한 캐싱 데이터 초기화",
      ],
    },
    {
      title: "React",
      description: [
        "zod, React-hook-form, useQuery, auth.js, zustand, Redux 등 라이브러리 적극 활용하며, 필요시엔 개인 라이브러리(Tsup 활용) 생성하여 반복작업 최소화",
        "Fiber 패러다임에 따른 우선랜더링을 이해하고 있으며, useCallback, Memo 적극 활용하여 메모리 최적화",
        "재사용의 요구치를 판단하여 컴포넌트 분리 및 재사용",
      ],
    },
    {
      title: "TypeScript",
      description: [
        "제네릭, Infer, Exclude, Pick 등 유틸을 활용한 타입 안정성을 확보한 개발",
        "공변성, 반공변성을 이해하여 타입의 확장, 축소를 통한 유연한 처리",
      ],
    },
    {
      title: "JavaScript",
      description: [
        "프로미스, 프로토타입, 컨텍스트 생성, 실행, 호이스팅, 렉시컬 환경 등 기본 개념을 이해하며 JS엔진에 대해 반복 숙달",
        "단순 map, filter를 떠나 재귀나 탐색기법을 이용해 트리 구조 생성하며, Set, Map 등 자료형을 활용하거나 시간복잡도를 고려한 트리구조 고민 및 구현, HashMap을 주로 사용",
        "쓰로틀링, 디바운싱을 이용하여 불필요한 트래픽 요청 최적화",
        "페이징, 인피니티 스크롤등 기술을 활용하며 Swiper나 퍼블리셔적 요소의 강점을 보유",
      ],
    },
    {
      title: "Sass",
      description: [
        "global.scss를 통해 css파일 import 구조화",
        "mixin 함수, 전역 변수 등을 통한 유틸 생성 및 재사용",
        "Flex, Grid를 주로 사용하며 float 개념도 숙지하여 스타일 이격 시 대응",
      ],
    },
    {
      title: "Tailwindcss",
      description: [
        "tailwind v4를 활용하여 직접 UI 컴포넌트 생성하거나, Shadcn-ui를 통해 빠른 UI 퍼블리싱 작업",
      ],
    },
    {
      title: "styled-components",
      description: [
        "React에서 사용하였으나 현재는 사장되어 개인적으로 사용을 지양",
      ],
    },
  ],
  "Back-End": [
    {
      title: "Nest.js",
      description: [
        "Class기반, 앵귤러 아키텍처인 Nest.js를 통한 API 구축",
        "인터셉터, guard를 생성한 RBAC이나 요청 분기처리",
        "typeORM과 함께 사용하여 DTO를 이용한 데이터 검증하고 bcrypt와 crypto를 이용한 JWT Token 생성, 대칭 키를 이용한 서명 검증",
        "Nest의 인스턴스 주입방식을 이해하고 있고 Postman을 주로 사용",
      ],
    },
    {
      title: "Express",
      description: ["MVC패턴을 이용하여 controller, service를 나누어 API 생성"],
    },
    {
      title: "Php",
      description: [
        "jQuery와 활용하여 웹개발, include로 파일구조화 시켜 파일 재사용",
      ],
    },
  ],
  Database: [
    {
      title: "PostgreSQL, MySQL",
      description: [
        "CASCADE, RESTRICT를 이해하며 이에 따른 관계 테이블 설정과 Join문을 통한 CRUD 기본기능 원활 수행",
        "트랜잭션 기능을 주로 사용하며 Rollback과 Commit을 통한 데이터 무결성 체크",
        "최대 3NF 정규화를 따르며 상황에 따라 다형성, 1:N, N:M 등의 테이블 설계",
        "Drizzle ORM을 주로 사용, DBMS는 Workbench, PhpMyAdmin, DBeaver를 사용",
      ],
    },
  ],
  DevOps: [
    {
      title: "AWS",
      description: [
        "S3 + CloudFront를 통해 리전을 활용한 캐싱 데이터 활용",
        "EC2 인스턴스 생성 및 로드밸런싱을 통한 SSL 인증",
        "인스턴스 서버에 PM2를 통해 프록시 서버에서 EC2 가동하여 Nginx 설치 및 운영",
        "IAM의 정책을 활용하여 S3의 접근이나 EC2의 제어를 컨트롤",
      ],
    },
    {
      title: "Vercel",
      description: [
        "Next.js 프로젝트 배포 및 도메인 설정, 환경 변수 관리",
        "Serverless Function과 Edge Function을 활용한 백엔드 구현",
        "Vercel Analytics를 통한 웹 성능 모니터링",
      ],
    },
    {
      title: "Github Action",
      description: ["Github Action을 통한 CI/CD > S3 자동화 배포"],
    },
    {
      title: "Home Server",
      description: [
        "남는 컴퓨터에 CentOS 7를 설치하여 테스트 서버로 운영하며 개인 외주 경험",
        "공인 IP, 내부 IP 등을 구분하며 외부에서 접근 가능하도록 설정",
      ],
    },
  ],
  Design: [
    {
      title: "Adobe",
      description: [
        "포토샵이나 일러스트를 통한 보정 작업이나 로고 작업",
        "보정 색상 작업이 자유롭게 가능하며, 마스크나 고급 필터 등을 활용하여 이미지 활용",
      ],
    },
    {
      title: "figma,Adobe XC",
      description: [
        "Figma, Adobe를 통해 UI UX 디자인 및 작업",
        "header, body, footer나 GNB 개념을 확보하고 있으며 디자인 시 적절한 톤앤매너 배치하려함",
        "figma의 css를 추출하여 스타일 시트에 활용",
      ],
    },
  ],
};
