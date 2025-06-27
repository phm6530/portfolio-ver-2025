import { Button } from "@/components/ui/button";
import { GitCompareIcon, Mail, NotebookText, Phone } from "lucide-react";

const Link = (url: string) => {
  window.open(url, "_blank");
};

export default function Footer() {
  return (
    <footer className="text-xs  py-10 flex flex-col gap-2 bg-zinc-800">
      <div className="layout-center">
        <div className="flex gap-2 mb-5 ">
          <Button
            onClick={() => Link("https://github.com/phm6530/MYportfolio")}
            variant={"outline"}
            className="size-10 rounded-full border-border "
          >
            <GitCompareIcon />
          </Button>
          <Button
            onClick={() => Link("https://blog.h-creations.com/")}
            variant={"outline"}
            className="size-10 rounded-full border-border "
          >
            <NotebookText />
          </Button>
        </div>

        <div className="grid grid-cols-[30px_1fr]">
          <Mail size={"14"} /> <span> squirrel309@naver.com</span>
        </div>

        <div className="grid grid-cols-[30px_1fr]">
          <Phone size={"14"} /> <span> 010-0000-0000</span>
        </div>

        <p className="max-w-[500px] leading-6 my-3 opacity-75">
          이미지 저작권은 유료 프리픽을 라이센스를 사용중이며, 게시물은 상업적
          목적이 아닌 포트폴리오 목적으로만 사용됩니다. 아직 공개되지 않은
          작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
        </p>

        <p style={{ marginTop: "20px" }}>Copyright ⓒ p. Hyun</p>
      </div>
    </footer>
  );
}
