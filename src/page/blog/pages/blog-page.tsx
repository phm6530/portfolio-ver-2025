import SearchField from "@/components/shared/search-input-field";
import BlogList from "@/features/Blog/BlogList/BlogList";
import BlogTab from "@/features/Blog/BlogTab.js/BlogTab";

const BlogPage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start max-w-3xl border-b border-white/10">
      <div className="mb-6 animate-topIn ani-delay-0.2 opacity-0">
        <div className="text-xs uppercase tracking-widest text-white/50">
          DEV & Publisher
        </div>
        <h1 className="text-6xl font-semibold mt-2 bg-gradient-to-l from-white to-indigo-200  text-transparent bg-clip-text pb-3">
          Dev Blog
        </h1>
      </div>

      <div className="text-white/80 text-sm  animate-topIn ani-delay-0.3 opacity-0 mb-12 leading-6">
        <p>Tech Archive" code, 개발, 그리고 기술에 관한 기록 공간 입니다</p>
        <p>
          해당 페이지는{" "}
          <span
            className="text-red-300 underline hover:text-red-200 cursor-pointer"
            onClick={() =>
              window.open("https://blog.h-creations.com", "_blank")
            }
          >
            개인 블로그
          </span>{" "}
          의 Api를 통해 데이터를 받아 옵니다.
        </p>
      </div>

      <div className=" animate-topIn ani-delay-0.4 opacity-0 w-full md:w-auto">
        <BlogTab />
        <SearchField name="keyword" />
      </div>

      <BlogList />
    </div>
  );
};

export default BlogPage;
