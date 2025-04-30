import SearchForm from 'component/ui/SearchForm';
import BlogTab from '@features/Blog/BlogTab.js/BlogTab';
import BlogNewPostList from 'features/Blog/BlogNewPostList/BlogNewPostList';
import BlogList from '@features/Blog/BlogList/BlogList';
import BlogSUbCategoryTitle from '@features/Blog/BlogSubCategoryTitle';

const BlogPage = (): JSX.Element => {
    return (
        <>
            <div className="flex flex-1 gap-7 mb-10 border-b ">
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
