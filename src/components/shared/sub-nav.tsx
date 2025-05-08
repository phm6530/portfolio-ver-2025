import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";
import { Button } from "@/components/ui/button";
const SUB_PAGES = [
  {
    label: "About",
    description: "Developer Profile",
    to: "/about",
  },
  {
    label: "Project",
    description: "Work acaive",
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

export default function SubNav() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-5 animate-leftIn ani-delay-0.1 opacity-0 sticky top-30 transition-all textContainer">
      {SUB_PAGES.map((page, idx) => {
        return (
          <Link
            to={page.to}
            className={cn(
              "opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex gap-2",
              pathname === page.to && "opacity-100"
            )}
          >
            <div
              className={cn(
                "text-white/60",
                pathname === page.to && "text-indigo-200"
              )}
            >
              {(idx + 1).toString().padStart(2, "0")}.
            </div>
            <div>
              <div className="mt-2 text-base font-medium">{page.label}</div>
              <div className="mt-1 text-xs text-white/60">
                {page.description}
              </div>
            </div>
          </Link>
        );
      })}{" "}
      {/* <div className="border-t border-border pt-5 flex gap-2 animate-leftIn ani-delay-0.9 opacity-0  ">
        <Button
          className="rounded-lg size-10 bg-transparent! border border-border"
          variant={"outline"}
          onClick={() => window.open("https://open.kakao.com/o/sq4skkTf")}
        >
          <Kakao className=" fill-foreground" />
        </Button>
        <Button
          className="rounded-full size-10 bg-transparent!  border border-border"
          variant={"outline"}
          onClick={() => window.open("https://github.com/phm6530/")}
        >
          <GitSvg className=" fill-foreground" />
        </Button>
        <Button
          className="rounded-full size-10 bg-transparent!  border border-border"
          variant={"outline"}
          onClick={() => window.open("https://blog.h-creations.com/")}
        >
          <BlogSvg className=" fill-foreground" />
        </Button>
      </div> */}
    </div>
  );
}
