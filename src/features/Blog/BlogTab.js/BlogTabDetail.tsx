import useQueryString from "../../../hooks/useSearchQueryString";
import { useSearchParams } from "react-router-dom";
import { BlogCategoryDetail } from "@/type/BlogTypes";
import PostNewIcon from "@/components/ui/PostNewIcon";
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
          "p-2.5 px-3 text-sm rounded-full bg-zinc-500/10",
          categoryParams === category &&
            itemParams === item &&
            "bg-zinc-900 dark:bg-primary text-background dark:text-white"
        )}
        onClick={() =>
          navigateHandler({
            category,
            item,
          })
        }
      >
        {item}{" "}
        <span
          className={cn(
            "text-xs text-orange-300",
            categoryParams === category &&
              itemParams === item &&
              "bg-zinc-900 dark:bg-primary text-background dark:text-white/50"
          )}
        >
          ({cnt})
        </span>{" "}
        {newPost && <PostNewIcon />}
      </button>
    </>
  );
};

export default BlogTabDetail;
