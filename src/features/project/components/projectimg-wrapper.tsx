import { IMG_URL } from "@/constants/apiUrl";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

export default function ProjectImgWrapper({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) {
  const [more, setMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [longImg, setLongImg] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  const imgOnload: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setIsLoading(false);

    if (ref.current) {
      const currentHeight = ref.current.clientHeight;
      // 1000px 이상일때 더보기 설정
      if (currentHeight > 400) {
        setLongImg(true);
      }
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden relative transition-all rounded-xl  ",
        longImg && "aspect-[16/10] md:aspect-[16/10]",
        longImg && more && "aspect-auto!"
      )}
    >
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          loading...
        </div>
      )}
      <img
        src={`${IMG_URL}/${url}`}
        ref={ref}
        alt={alt}
        className="w-full h-auto"
        onLoad={imgOnload}
        onError={() => setIsLoading(false)}
      />
      {longImg && !more && (
        <div
          className="absolute bottom-0 flex z-5 w-full gap-2 justify-center text-center py-4 text-xs cursor-pointer bg-gradient-to-t from-black/55 to-transparent"
          style={{
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setMore((prev) => !prev)}
        >
          {!more ? "펼쳐보기" : "닫기"}{" "}
          <ChevronDown size={14} className={cn(more && "rotate-180")} />
        </div>
      )}
    </div>
  );
}
