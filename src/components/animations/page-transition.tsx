import { ReactNode, useRef } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return <div ref={nodeRef}>{children}</div>;
}
