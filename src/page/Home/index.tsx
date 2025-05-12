import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Button } from "@/components/ui/button";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { ChevronRight } from "lucide-react";
import RecentProject from "./components/recent-project";
import RecentPosts from "./components/recent-post";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <main className={`md:h-screen text-white overflow-hidden relative `}>
      <div
        className={cn(`absolute top-0 left-0  z-0 w-full h-full 
              after:z-0 after:absolute after:inset-0 
              after:content-[''] after:bg-cover after:bg-center after:bg-no-repeat
              after:bg-gradient-to-r after:from-transparent after:to-black/50
              after:pointer-events-none after:animate-opacity 
    `)}
        style={{
          backgroundImage: `url(/vanner/vanner_3.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          animation: `
            bgScaleInit 5s cubic-bezier(0, 0.75, 0, 0.62) forwards, 
            bgScaleLoop 10s 5s ease  infinite alternate
            `,
        }}
      />
      <ShootingStar />
      {/* 메인 콘텐츠 영역 */}
    </main>
  );
};

export default Home;
