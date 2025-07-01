import { ReactNode } from "react";

export default function PageMainText({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-4xl  md:text-5xl md:leading-16 font-Montserrat mb-6 animate-topIn ani-delay-0.2 opacity-0">
      {children}
    </h1>
  );
}
