import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LinksWiget() {
  // Links
  const MY_LINKS = [
    {
      to: "https://open.kakao.com/o/sq4skkTf",
      svg: Kakao,
      label: "오픈 카카오톡",
    },
    {
      to: "https://github.com/phm6530/",
      svg: GitSvg,
      label: "git",
    },
    {
      to: "https://blog.h-creations.com/",
      svg: BlogSvg,
      label: "개인 블로그",
    },
  ];
  return (
    <div className="flex flex-col pt-5">
      <span className="text-xs mb-3 text-white/40 relative ">Links</span>
      <div className="flex gap-2">
        {MY_LINKS.map((btn) => {
          return (
            <TooltipProvider key={`:links${btn.label}`}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="bg-transparent!  transition-all duration-100 group p-2 h-auto rounded-full border  border-border hover:border-indigo-200/50"
                    onClick={() => window.open(btn.to)}
                  >
                    <div className="relative">
                      <btn.svg className="size-3.5 fill-foreground opacity-50 group-hover:opacity-100 group-hover:fill-indigo-200 transition-all" />
                      <div className="absolute -inset-1 scale-0 group-hover:scale-100 bg-indigo-400/20 blur-md rounded-full -z-10 transition-all duration-300"></div>
                    </div>
                  </div>{" "}
                </TooltipTrigger>
                <TooltipContent className="bg-indigo-500 before:bg-indigo-500! after:bg-indigo-500!">
                  <p>{btn.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
