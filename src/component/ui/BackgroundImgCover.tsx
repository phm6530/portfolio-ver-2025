import { cn } from "@/lib/utils";
import React from "react";

const BackgroundImgCover: React.FC<{
  mainPage?: boolean;
  imgSrc: string;
  children?: React.ReactNode;
}> = ({ mainPage, imgSrc, children }) => {
  return (
    <div
      className={cn(
        "inset-0 absolute w-full h-full bg-red-50 bg-cover",
        mainPage && "100vh"
      )}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: "75% bottom",
        animation: `
            bgScaleInit 5s cubic-bezier(0, 0.75, 0, 0.62) forwards, 
            bgScaleLoop 10s 5s ease  infinite alternate,
            opacity .5s ease-out forwards`,
      }}
    >
      <div className="absolute inset-0 w-full h-full animate-opacity z-1 bg-gradient-to-r from-[#00000074] to-[#0000008a]" />
      {children}
    </div>
  );
};

export default BackgroundImgCover;
