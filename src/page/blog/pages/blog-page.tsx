import SearchField from "@/components/shared/search-input-field";
import PageMainText from "@/components/ui/page-main-text";
import BlogList from "@/features/Blog/BlogList/BlogList";
import BlogTab from "@/features/Blog/BlogTab.js/BlogTab";
import { NotebookPen } from "lucide-react";

const BlogPage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start max-w-3xl border-b border-white/10 ">
      <NotebookPen size={40} className="text-teal-300 mb-3" />

      {/* Page-text */}
      <PageMainText>
        Dev Blog,<br></br>
      </PageMainText>

      <div className="mb-10 text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0 max-w-[600px] break-keep">
        <p>Tech Archive" code, 개발, 그리고 기술에 관한 기록 공간 입니다</p>
        <p>
          해당 페이지는{" "}
          <span
            className="text-indigo-200 hover:text-teal-400 underline  cursor-pointer"
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
