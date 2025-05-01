import { LuSunDim } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

import useStore from "@/store/zustandStore";
import useScrollY from "@/hooks/useScrollY";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function DarkModeBtn() {
  const darkMode = useStore((state) => state.darkMode);
  const darkmodeToggle = useStore((state) => state.darkmodeToggle);
  const { scrollOver } = useScrollY(300);

  const modeHandler = () => {
    darkmodeToggle();
  };
  useEffect(() => {
    if (darkMode) {
      document.querySelector("body")?.classList.add("dark");
    } else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className="border border-border mx-3  relative p-1  rounded-full w-[70px] cursor-pointer "
      onClick={() => modeHandler()}
    >
      <span
        className={cn(
          "size-6  bg-zinc-600 flex items-center justify-center  rounded-full transition-all duration-300 ease-initial ",
          darkMode ? "translate-x-[36px]" : "translate-x-[0px]"
        )}
      >
        {darkMode ? <IoMoon size={"15"} /> : <LuSunDim size={"20"} />}
      </span>
    </div>
  );
}
