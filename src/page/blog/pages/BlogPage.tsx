import SearchField from "@/components/shared/search-input-field";
import BlogList from "@/features/Blog/BlogList/BlogList";
import BlogSUbCategoryTitle from "@/features/Blog/BlogSubCategoryTitle";
import BlogTab from "@/features/Blog/BlogTab.js/BlogTab";

const BlogPage = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-1 gap-7 border-border pb-8">
        {/* List */}
        <BlogTab />
      </div>
      <div>
        <BlogSUbCategoryTitle />
        {/* Board List */}
        <BlogList />
      </div>
    </>
  );
};

export default BlogPage;
