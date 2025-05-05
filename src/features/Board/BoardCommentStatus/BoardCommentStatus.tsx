interface BoardCommentStatus {
  todayReply: number;
  total: number;
}

export default function BoardCommentStatus({
  todayReply,
  total,
}: BoardCommentStatus) {
  return (
    <div className="flex gap-5 text-xs ">
      <div className="bg-gradient-to-r font-bold from-indigo-300 to-violet-100 text-transparent bg-clip-text mb-3 ">
        오늘 작성된 댓글 <span>{todayReply}</span>
      </div>
      <div className="bg-gradient-to-r font-bold from-indigo-300 to-violet-100 text-transparent bg-clip-text mb-3 ">
        전체 댓글 <span>{total}</span>
      </div>
    </div>
  );
}
