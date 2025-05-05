import useStore from "@/store/zustandStore";
import { Button } from "@/components/ui/button";
import { Github, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserProfile() {
  const login = useStore((state) => state.userAuth.login);

  return (
    <div className="border shadow-2xl md:flex hidden border-border  flex-col items-center justify-center -mt-10 bg-background rounded-2xl p-10 text-center sticky top-20  aspect-[16/16]">
      <div className="relative">
        <span
          className={cn(
            "size-5 inline-block absolute -top-[0px] left-[5px] z-10   rounded-full border-2 border-background",
            login ? "bg-gradient-to-l from-teal-800 to-teal-400" : "bg-zinc-600"
          )}
        ></span>
        <div className="rounded-full overflow-hidden size-20 border-4 border-border relative">
          <img src="/img/me.jpg" alt="IT's ME" />
        </div>
      </div>

      <div className="flex flex-col gap-3 my-4">
        <h1 className="text-xl">Park, Hyun Min</h1>

        <div className="flex gap-2 justify-center">
          <Button
            className="rounded-full size-10 bg-transparent! border border-border"
            variant={"outline"}
          >
            <MessageCircle />
          </Button>
          <Button
            className="rounded-full size-10 bg-transparent!  border border-border"
            variant={"outline"}
          >
            <Github />
          </Button>
          <Button
            className="rounded-full size-10 bg-transparent!  border border-border"
            variant={"outline"}
          >
            {/* <BlogIcon className="fill-indigo-500 w-6 h-6" />;/ */}
          </Button>
        </div>

        <div className="flex flex-col mt-3">
          <p className="text-sub text-sm">@Web Publisher</p>
          <p className="text-sub text-sm">@Front Developer</p>
        </div>
        {/* <ContactButtons /> */}
      </div>
    </div>
  );
}
