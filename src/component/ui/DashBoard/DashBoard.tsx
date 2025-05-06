import BackgroundImgCover from "../BackgroundImgCover";
import StarAnimation from "@/component/animations/StarAnimation";
import { cn } from "@/lib/utils";
import styled, { keyframes } from "styled-components";

const animationShadow = keyframes`
    from{
        opacity: 0;
        transform: translateX(0px);
    }
    to{
        opacity: .15;
        transform: translateX(50px);
    }
`;

const DashBoardShadow = styled.div`
  position: absolute;
  font-size: 5rem;
  z-index: 0;
  font-family: "Poppins";
  bottom: -25px;
  background: linear-gradient(to top, #ffffff11, #c2c2c22b, #0000004a);
  left: 10px;
  color: transparent;
  font-weight: bold;
  background-clip: text;
  -webkit-background-clip: text;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.1, 0.45, 0, 1.09);
  animation: ${animationShadow} 1s 0.7s cubic-bezier(0.1, 0.45, 0, 1.09)
    forwards;
`;

interface DashBoardProps {
  className?: string;
  pageTitle?: string;
  subComment?: string;
  page?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}

const DashBoard: React.FC<DashBoardProps> = ({
  className,
  pageTitle,
  subComment,
  align = "left",
}) => {
  return (
    <div className={cn("w-full relative overflow-hidden")}>
      {/* 백그라운드 */}
      <BackgroundImgCover imgSrc="/img/Main_bg.webp">
        <StarAnimation />
      </BackgroundImgCover>

      <div className="layout-center relative pt-[12.5rem] pb-[8rem]">
        <div
          className={cn(
            "relative mb-5",
            align === "center"
              ? "text-center"
              : align === "left"
                ? "text-left"
                : ""
          )}
        >
          <div
            className={cn(
              "opacity-0 font-Poppins text-7xl text-transparent pb-3 -tracking-[0.1rem] font-bold animate-leftIn ani-delay-0.5 bg-gradient-to-t from-[#fff] via-[#fff] to-[#96c1ff] bg-clip-text inline-block",

              align === "center" && "animate-topIn"
            )}
          >
            {pageTitle}
          </div>
          <DashBoardShadow id="dashboardShadow" className={className}>
            {pageTitle}
          </DashBoardShadow>
        </div>

        {subComment && (
          <div
            className={cn(
              "inline-block text-sm md:text-base",
              "bg-gradient-to-l opacity-0 from-[#f0f0f0] via-[#a9a5cc] to-[#8e9bfc] text-transparent bg-clip-text font-bold",
              "animate-leftIn ani-delay-0.6"
            )}
          >
            {subComment}
          </div>
        )}

        {/* <div className="absolute bottom-10 right-0 border border-white/20 p-5 bg-white/5 rounded-lg">
          <p className="text-sm">
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
            <Lin className="mr-2" />
            Next.js Blog 바로가기
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;
