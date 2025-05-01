import { cn } from "@/lib/utils";
import useBlogNewPostList from "../hooks/useBlogNewPostLIst";
import PostItem from "./BlogPostItem";

const BlogNewPostList: React.FC<{ className?: string; page?: string }> = ({
  className,
  page,
}) => {
  // 최신글 리스트
  const { data } = useBlogNewPostList();
  const isMainPage: boolean = page === "main";

  return (
    <section className={cn("md:block hidden ", className)}>
      <h1 className={cn("text-sm pb-4", isMainPage && "text-zinc-100")}>
        New Post
      </h1>
      <div
        className={cn(
          "cursor-pointer max-w-[400px]",
          isMainPage
            ? "grid grid-cols-2 gap-3 text-zinc-100"
            : "flex flex-col gap-3"
        )}
      >
        {data?.map((item, idx) => (
          <PostItem
            idx={idx}
            page={isMainPage}
            key={item.post_id}
            post_description={item.post_description}
            post_new={!!item.post_new}
            post_id={item.post_id}
            post_title={item.post_title}
            create_at={item.create_at}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogNewPostList;
