import DashBoard from "@/components/ui/subpage-header";
import BlogRoutes from "@/Route/BlogRoutes";
import Motion from "@/components/animations/Motion";

import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = (): JSX.Element => {
  return (
    <div className="grid">
      <DashBoard
        pageTitle={"Blog"}
        subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
      >
        <div className="absolute max-w-[400px] bottom-10  right-0 border border-white/20 p-5 bg-white/5 rounded-lg">
          <p className="text-sm leading-6">
            이 페이지는 별도의 블로그 페이지에서 작성된 글들을 Next.js API를
            통해 불러오고 있습니다.
          </p>
          <br></br>
          <Button
            className="border"
            variant="outline"
            onClick={() =>
              window.open("https://blog.h-creations.com", "_blank")
            }
          >
            <Link className="mr-2" />
            Next.js Blog 바로가기
          </Button>
        </div>
      </DashBoard>

      <div className="layout-center py-10">
        <Motion.FadeInOut>
          <BlogRoutes />
        </Motion.FadeInOut>
      </div>
    </div>
  );
};

export default Blog;
