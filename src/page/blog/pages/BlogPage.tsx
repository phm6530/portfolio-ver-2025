import SearchField from "@/components/shared/search-input-field";
import SubNav from "@/components/shared/sub-nav";
import BlogList from "@/features/Blog/BlogList/BlogList";
import BlogSUbCategoryTitle from "@/features/Blog/BlogSubCategoryTitle";
import BlogTab from "@/features/Blog/BlogTab.js/BlogTab";
import { AnimatedBackgroundGlows } from "@/page/about/tttt";

const BlogPage = (): JSX.Element => {
  return (
    <>
      <main
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(145, 126, 210, 0.15) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(143, 147, 247, 0.15) 0%, transparent 55%)",
        }}
        className="min-h-screen bg-gradient-to-l from-[#332d38] to-[#95fff4] relative bg-fixed text-white flex flex-col"
      >
        <AnimatedBackgroundGlows />
        {/* <StarAnimation /> */}

        <div className="grid grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
          <div>
            {/* SUbpage - Nav */}
            <SubNav />
          </div>

          <div className="flex-1 max-w-3xl border-b border-white/20">
            <div className="mb-12 animate-topIn ani-delay-0.2 opacity-0">
              <div className="text-xs uppercase tracking-wider text-white/60">
                DEV & Publisher
              </div>
              <div className="text-6xl font-light mt-4 bg-clip-text pb-4 bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
                Blog<span className="text-red-300 font-semibold">'</span>{" "}
              </div>
              {/* <div className="w-16 h-0.5 bg-white/20 mt-6"></div> */}
            </div>
            {/* <div className="space-y-8 mb-10 text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
            <p>
              퍼블리셔로서의 경험을 바탕으로 프론트엔드 개발자로의 전환을
              모색하고 있으며, <br></br>
              이를 통해 사용자 경험을 개선하고 더 나은 사용자 인터페이스를
              제공하는 데 기여하고자 합니다.
            </p>
          </div> */}
            <BlogTab />
            <SearchField name="keyword" />
            {/* Board List */}
            <BlogList />
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPage;
