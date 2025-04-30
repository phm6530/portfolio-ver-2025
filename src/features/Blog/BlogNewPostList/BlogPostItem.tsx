import PostNewIcon from "@/component/ui/PostNewIcon";
import { cn } from "@/utils/cn";
import { DateUtils } from "@/utils/dateUtil";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const ItemPostTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  display: inline-block;
  max-width: calc(100% - 17px);
`;

type PostItemProps = {
  idx?: number;
  page?: boolean;
  post_description?: string;
  post_new?: boolean;
  post_id: number;
  post_title: string;
  create_at: Date;
};

const PostItem: React.FC<PostItemProps> = ({
  idx,
  page: mainPage,
  post_id,
  post_title,
  post_description,
  create_at,
  post_new,
}) => {
  const navigate = useNavigate();
  const firstIdx = idx === 0;

  return (
    <div
      className={cn(
        "text-[13px] hover:text-hover ",
        firstIdx && "col-span-2 ",
        mainPage && "border! border-white/15! p-4 rounded-xl bg-[#ffffff05]"
      )}
      onClick={() => navigate(`/blog/${post_id}`)}
    >
      <div className="flex items-center">
        <ItemPostTitle>{post_title}</ItemPostTitle>
        {post_new && <PostNewIcon />}
      </div>
      {mainPage && firstIdx && <p className="mt-1">{post_description}</p>}

      <div className="text-xs opacity-50 mt-1">
        {DateUtils.dateFormatKR(create_at, "YYYY. MM. DD")}
      </div>
    </div>
  );
};
export default PostItem;
