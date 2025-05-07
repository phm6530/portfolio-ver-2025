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
  children,
  align = "left",
}) => {
  return (
    <div className={cn("w-full relative overflow-hidden")}>
      {/* 백그라운드 */}
      <BackgroundImgCover imgSrc="/img/Main_bg.webp">
        <StarAnimation />
      </BackgroundImgCover>

      <div className="layout-center relative pt-[13.5rem] pb-[2em]">
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
              "opacity-0 font-Poppins text-[80px] text-transparent pb-3 -tracking-[0.1rem] font-bold animate-leftIn ani-delay-0.5 bg-gradient-to-t from-[#fff] via-[#fff] to-[#96c1ff] bg-clip-text inline-block",

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
              "bg-gradient-to-l opacity-0 from-[#e2a285] via-[#ffffff] to-[#ffd099] text-transparent bg-clip-text font-bold",
              "animate-leftIn ani-delay-0.6"
            )}
          >
            {subComment}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default DashBoard;
