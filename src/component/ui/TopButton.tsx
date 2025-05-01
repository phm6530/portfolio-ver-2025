import { GoMoveToTop } from "react-icons/go";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TopButton = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const TopButtonHadnler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 스크롤을 부드럽게
  };

  useEffect(() => {
    const heightFunc = () => {
      const target = window.scrollY;
      if (target > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", heightFunc);
    return () => {
      window.removeEventListener("scroll", heightFunc);
    };
  }, []);

  return (
    <>
      <span
        className={cn(
          "fixed right-10 bottom-5 z-100 pointer-events-none transition-all opacity-0 duration-150 size-10 rounded-full cursor-pointer bg-zinc-900 [&>svg]:text-white flex items-center justify-center",
          show && "bottom-10 opacity-100 pointer-events-auto"
        )}
        onClick={() => TopButtonHadnler()}
      >
        <GoMoveToTop />
      </span>
    </>
  );
};

export default TopButton;
