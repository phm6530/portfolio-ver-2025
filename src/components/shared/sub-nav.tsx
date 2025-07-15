import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SUB_PAGES = [
  {
    label: "About",
    description: "Developer Profile",
    to: "/about",
  },
  {
    label: "Project",
    description: "Work archive",
    to: "/project",
  },
  {
    label: "Blog",
    description: "Tech articles",
    to: "/blog",
  },
  {
    label: "Board",
    description: "guest board",
    to: "/board",
  },
];

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

export default function SubNav() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-7 animate-leftIn ani-delay-0.1 opacity-0 sticky top-40 transition-all textContainer">
      {SUB_PAGES.map((page, idx) => {
        const active = "/" + pathname.split("/")[1] === page.to;

        return (
          <Link
            to={page.to}
            key={`subnav-${idx}`}
            className={cn(
              "opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer flex gap-2 relative",
              active && "opacity-100"
            )}
          >
            {active && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 via-indigo-400/20 to-transparent rounded-md blur-md -z-10"></div>
            )}
            <div
              className={cn(
                "text-white/60 transition-colors duration-300",
                active && "text-indigo-300 font-bold"
              )}
            >
              {(idx + 1).toString().padStart(2, "0")}.
            </div>
            <div>
              <div
                className={cn(
                  "mt-2 text-base font-medium transition-colors duration-300",
                  active && "text-white font-semibold"
                )}
              >
                {page.label}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {page.description}
              </div>
            </div>
          </Link>
        );
      })}

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
    </div>
  );
}
