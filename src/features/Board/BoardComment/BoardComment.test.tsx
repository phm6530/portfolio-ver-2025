import { render } from "@testing-library/react";
import BoardComment from "./BoardComment";
import { CommentItemModel } from "../board-commentlist";
import QueryProviderClient from "@/react-query/query-provider";

const ITEM: CommentItemModel = {
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
};

test("test", () => {
  render(<BoardComment item={ITEM} deps={1} rootId={ITEM.id} />, {
    wrapper: QueryProviderClient,
  });
});
