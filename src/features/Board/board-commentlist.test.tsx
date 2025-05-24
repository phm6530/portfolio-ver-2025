import { render, screen, within } from "@testing-library/react";
import BoardCommentList, { CommentItemModel } from "./board-commentlist";
import QueryProviderClient from "@/react-query/query-provider";
import { vi, test, expect } from "vitest";

// FadeInAnimation 모킹
vi.mock("@/components/animations/FadeInAnimation", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// BoardComment 컴포넌트 모킹
vi.mock("@/features/Board/BoardComment/BoardComment", () => ({
  default: ({
    item,
  }: {
    item: CommentItemModel;
    deps: number;
    rootId: number;
  }) => (
    <div data-testid={`comment-${item.id}`} role="listitem">
      {item.comment}
    </div>
  ),
}));

// BoardCommentStatus 컴포넌트 모킹 (있는 경우)
vi.mock("./BoardCommentStatus/BoardCommentStatus", () => ({
  default: ({ todayReply, total }: { todayReply: number; total: number }) => (
    <div data-testid="comment-status">
      오늘 {todayReply}개, 전체 {total}개의 댓글
    </div>
  ),
}));

// DateUtils 모킹
vi.mock("@/utils/dateUtil", () => ({
  DateUtils: {
    isToday: () => true,
    parseKoreanDate: () => "2025년 5월 21일",
  },
}));

test("댓글 목록 랜더링", async () => {
  // Provider
  render(<BoardCommentList />, { wrapper: QueryProviderClient });

  // 초기 로딩 인디케이터 4개
  const loading = screen.getAllByTestId("loading");
  expect(loading).toHaveLength(4);

  // 이후 Api list 가져옴
  const listWrapper = screen.getByTestId("list-wrapper");

  //테스트 랜더
  const items = await within(listWrapper).findAllByRole("listitem");
  expect(items).toHaveLength(2);
});
