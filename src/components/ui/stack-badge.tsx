import { ReactNode } from "react";

export default function StacBadge({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] py-0.5 px-2 bg-white/10 text-white/60 rounded-full">
      {children}
    </span>
  );
}
