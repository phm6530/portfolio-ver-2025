import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function StackBadge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "text-[10px] py-0.5 px-2 bg-white/10 text-white/70 rounded-full",
        className
      )}
    >
      {children}
    </span>
  );
}
