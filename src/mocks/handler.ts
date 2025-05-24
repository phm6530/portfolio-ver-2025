// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

const BASEURL = "https://blog.h-creations.com/api";

export const handlers = [
  http.get(`${BASEURL}/guestboard`, () => {
    return HttpResponse.json({
      success: true,
      result: [
        {
          id: 678,
          comment: "넘 멋있습니다넘 멋있습니다 favicon만 수정하시면 될거같아요",
          created_at: "2025-05-21T07:13:03.599Z",
          parent_id: null,
          author: {
            role: "guest",
            guest_id: 221,
            nickname: "ergeh",
            profile_img: "person_1.png",
          },
          author_type: "guest",
          children: [
            {
              id: 679,
              comment: "피드백 감사합니다! 곧 수정하겠습니다.",
              created_at: "2025-05-21T07:20:18.123Z",
              parent_id: 678,
              author: {
                role: "admin",
                admin_email: "admin@example.com",
                nickname: "관리자",
                profile_img: null,
              },
              author_type: "admin",
              children: [],
            },
          ],
        },
        {
          id: 677,
          comment: "포트폴리오 잘 봤습니다. 정말 인상적인 프로젝트들이네요!",
          created_at: "2025-05-20T15:45:22.347Z",
          parent_id: null,
          author: {
            role: "guest",
            guest_id: 220,
            nickname: "방문자",
            profile_img: "person_2.png",
          },
          author_type: "guest",
          children: [],
        },
      ],
    });
  }),
];
