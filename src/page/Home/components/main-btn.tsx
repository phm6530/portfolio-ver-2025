import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function MainvannerBtn({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const nav = useNavigate();
  return (
    <div
      className={cn(
        `flex text-zinc-50 cursor-pointer text-sm items-center p-4 px-8 gap-2 border border-white/40 rounded-full
          hover:text-[rgb(162,197,244)] hover:border-[rgb(162,197,244)]
        `,
        className
      )}
      onClick={() => nav(to)}
    >
      {children}
    </div>
  );
}
