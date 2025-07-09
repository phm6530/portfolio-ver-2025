import { ReactNode } from "react";
import SubNav from "../shared/sub-nav";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Motion from "../animations/Motion";

export default function SidebarWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-40 z-1 layout-center py-40">
      <div className="md:block hidden">
        <SubNav />
      </div>
      <AnimatePresence mode="wait">
        <Motion.Page key={location.pathname}>{children}</Motion.Page>
      </AnimatePresence>
    </div>
  );
}
