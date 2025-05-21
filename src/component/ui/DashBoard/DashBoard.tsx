import { cn } from "@/lib/utils";

interface DashBoardProps {
  className?: string;
  pageTitle?: string;
  subComment?: string;
  page?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}

const DashBoard: React.FC<DashBoardProps> = ({
  pageTitle,
  subComment,
  children,
  align = "left",
}) => {
  return (
    <div className={cn("w-full relative overflow-hidden")}>
      {/* 백그라운드 */}

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
