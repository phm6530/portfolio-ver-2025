import SearchForm from "@/component/ui/SearchForm";
import BlogList from "@/features/Blog/BlogList/BlogList";
import BlogNewPostList from "@/features/Blog/BlogNewPostList/BlogNewPostList";
import BlogSUbCategoryTitle from "@/features/Blog/BlogSubCategoryTitle";
import BlogTab from "@/features/Blog/BlogTab.js/BlogTab";

const BlogPage = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-1 gap-7 border-b border-border pb-8">
        {/* 최신글 */}
        <BlogNewPostList />
        <BlogTab />
      </div>

      <BlogSUbCategoryTitle />

      {/* Search */}
      <SearchForm />

      {/* Board List */}
      <BlogList />
    </>
  );
};

export default BlogPage;
