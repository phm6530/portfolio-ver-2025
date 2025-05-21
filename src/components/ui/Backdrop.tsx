import { cn } from "@/lib/utils";
import React from "react";

const BackDrop: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className={cn("fixed w-full h-full bg-zinc-950/50 inset-0 z-130  block")}
      onClick={onClick}
      style={{
        backdropFilter: "blur(2px)",
      }}
    />
  );
};

export default BackDrop;
