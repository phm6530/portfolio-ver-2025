import { cn } from "@/lib/utils";
import React from "react";

const BackgroundImgCover: React.FC<{
  mainPage?: boolean;
  imgSrc: string;
  children?: React.ReactNode;
}> = ({ mainPage, imgSrc, children }) => {
  return (
    <div
      className={cn("inset-0 absolute w-full h-full bg-red-50 bg-cover")}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: "bottom",
        animation: `
            bgScaleInit 5s cubic-bezier(0, 0.75, 0, 0.62) forwards, 
            bgScaleLoop 10s 5s ease  infinite alternate,
            opacity .5s ease-out forwards`,
      }}
    >
      <div className="absolute inset-0 w-full h-full animate-opacity z-1 bg-gradient-to-r from-[#b397b015] via-[#05050573] to-[#160a15a4]" />
      <div
        className="absolute w-10/12 h-screen right-0"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage:
            "linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        }}
      ></div>

      {children}
    </div>
  );
};

export default BackgroundImgCover;
