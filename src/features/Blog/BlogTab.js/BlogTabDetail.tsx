import useQueryString from "../../../hooks/useSearchQueryString";
import { useSearchParams } from "react-router-dom";
import { BlogCategoryDetail } from "@/type/BlogTypes";
import PostNewIcon from "@/component/ui/PostNewIcon";
import { cn } from "@/lib/utils";

interface BlogTabDetailProps extends BlogCategoryDetail {
  category: string;
  item: string;
}

const BlogTabDetail: React.FC<BlogTabDetailProps> = ({
  category,
  item,
  post_count: cnt,
  post_new: newPost,
}) => {
  const { navigateHandler } = useQueryString("blog");
  const [params] = useSearchParams();

  const itemParams: string | null = params.get("item");
  const categoryParams: string | null = params.get("category");

  return (
    <>
      <button
        className={cn(
          "items-center border border-border p-2 px-3 text-sm rounded-full",
          categoryParams === category && itemParams === item && "border-red-200"
        )}
        onClick={() =>
          navigateHandler({
            category,
            item,
          })
        }
      >
        {item} <span className="text-xs text-count">({cnt})</span>{" "}
        {newPost && <PostNewIcon />}
      </button>
    </>
  );
};

export default BlogTabDetail;
