import useStore from "@/store/zustandStore";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export default function DarkModeBtn({ scrollOver }: { scrollOver: boolean }) {
  const darkMode = useStore((state) => state.darkMode);
  const darkmodeToggle = useStore((state) => state.darkmodeToggle);

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
      className={cn(
        "border dark:border-zinc-50/20 hidden border-zinc-500 md:border-zinc-50/20 mx-3 relative p-1 rounded-full w-[70px] cursor-pointer ",
        scrollOver && "md:border-zinc-300"
      )}
      onClick={() => modeHandler()}
    >
      <span
        className={cn(
          "size-6  bg-zinc-600 flex items-center justify-center  rounded-full transition-all duration-300 ease-initial ",
          darkMode ? "translate-x-[36px]" : "translate-x-[0px]",
          scrollOver && ""
        )}
      >
        {darkMode ? <Moon size={"15"} /> : <Sun size={"20"} />}
      </span>
    </div>
  );
}
