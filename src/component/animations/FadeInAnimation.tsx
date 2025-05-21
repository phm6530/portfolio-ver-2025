import { cn } from "@/lib/utils";
import { memo, ReactNode, useEffect, useRef, useState } from "react";

const observerOptions = {
  threshold: 0.1,
};

const FadeInAnimation: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const slideHandler = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setVisible(true);
    }
  };

  // div 관찰
  useEffect(() => {
    if (!ref.current) return;
    const view = ref.current;
    const io = new IntersectionObserver(slideHandler, observerOptions);
    io.observe(view);

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("opacity-0", visible && "animate-bottom-in")}>
      {children}
    </div>
  );
};

export default memo(FadeInAnimation);
