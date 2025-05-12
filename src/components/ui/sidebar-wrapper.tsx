import { ReactNode } from "react";
import SubNav from "../shared/sub-nav";

export default function SidebarWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40 ">
      <div className="md:block hidden">
        <SubNav />
      </div>
      {children}
    </div>
  );
}
