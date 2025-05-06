import DashBoard from "@/component/ui/DashBoard/DashBoard";
import BlogRoutes from "@/Route/BlogRoutes";
import Motion from "@/component/animations/Motion";

const Blog = (): JSX.Element => {
  return (
    <>
      <DashBoard
        pageTitle={"Blog"}
        subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
      />

      <div className="layout-center py-10">
        <Motion.FadeInOut>
          <BlogRoutes />
        </Motion.FadeInOut>
      </div>
    </>
  );
};

export default Blog;
