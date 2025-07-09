import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

type MotionChildren = ReactNode;

interface MotionProps {
  className?: string;
  children: MotionChildren;
  delay?: number;
}

export const FadeUp: React.FC<MotionProps> = ({
  className,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay, // delay 옵션 적용
        ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInOut: React.FC<MotionProps> = ({ className, children }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -100 }}
      style={{ width: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
      }}
    >
      {children}
    </motion.div>
  );
};

export const Page: React.FC<MotionProps> = ({ className, children }) => {
  const scrollBlockedRef = useRef(false);

  const preventScroll = (e: Event) => {
    if (scrollBlockedRef.current) {
      e.preventDefault();
    }
  };

  const handleAnimationStart = () => {
    scrollBlockedRef.current = true;
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScroll, { passive: false });
  };

  const handleAnimationComplete = () => {
    scrollBlockedRef.current = false;
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventScroll);
    window.scrollTo({ top: 0 });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      transition={{
        duration: 0.3,
        ease: "easeIn",
      }}
    >
      {children}
    </motion.div>
  );
};

const Motion: {
  FadeUp: React.FC<MotionProps>;
  FadeInOut: React.FC<MotionProps>;
  Page: React.FC<MotionProps>;
} = {
  FadeUp: FadeUp,
  FadeInOut: FadeInOut,
  Page: Page,
};

export default Motion;

Motion.FadeInOut = FadeInOut;
Motion.Page = Page;
Motion.FadeUp = FadeUp;
