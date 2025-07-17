import { forwardRef } from "react";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";

import { ChevronRight, Mail, PhoneCall } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LinksWiget from "@/components/shared/link-wiget";

const MY_LINKS = [
  {
    to: "https://open.kakao.com/o/sq4skkTf",
    svg: Kakao,
    label: "KakaoTalk",
    subtitle: "오픈카카오톡 - 자스",
  },
  {
    to: "https://github.com/phm6530/",
    svg: GitSvg,
    label: "GitHub",
    subtitle: "깃허브",
  },
  {
    to: "https://blog.h-creations.com/",
    svg: BlogSvg,
    label: "Tech Blog",
    subtitle: "퍼블리셔와 개발자 그 어딘가 - blog",
  },
];

const HomeContact = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();

  return (
    <section
      ref={(el) => {
        if (el && ref && "current" in ref) {
          const arrayRef = ref.current!;
          if (!arrayRef.includes(el)) {
            arrayRef.push(el);
          }
        }
      }}
      className="h-screen w-screen  z-11 min-h-screen  absolute overflow-hidden"
    >
      {/* bg */}
      <div
        data-bg
        className=" absolute top-0  w-full h-full bg-cover "
        style={{
          backgroundImage: `
      linear-gradient(#1d191ccc, rgb(24 22 22 / 55%)), url(/img/k12.jpg)
          `,
        }}
      />

      {/* wrapper */}
      <div
        data-sec
        className=" absolute w-screen util-scrollbar flex h-screen overflow-y-scroll md:overflow-hidden justify-center"
      >
        <div className=" items-center mb-5  grid md:grid-cols-[2fr_1fr] layout-center">
          <div>
            <h1
              data-animate
              className="text-5xl md:text-7xl  pt-50 md:pt-0   font-black  mt-3  tracking-wider leading-tight  flex items-center gap-2 group   pb-5 "
            >
              Contact
            </h1>
            <div
              data-animate
              className="text-lg text-gray-300 leading-relaxed max-w-md"
            >
              <p className="leading-relaxed text-base md:text-lg">
                퍼블리셔 경험을 살려 개발자로의 새로운 여정을 시작합니다.
              </p>
              <p className="text-xs md:text-sm text-gray-400  font-medium  inline-block">
                React • Next.js • TypeScript • UI/UX
              </p>{" "}
              <Button
                className="text-xs md:p-6! p-5 md:px-4! flex gap-10 z-12 mt-10 md:mt-10"
                size={"sm"}
                onClick={() => nav("/about")}
              >
                자세히보기 <ChevronRight size={12} />
              </Button>{" "}
            </div>
          </div>

          <div
            data-animate
            className="z-10  pb-40 md:pb-0 border-t md:border-t-0 md:border-l border-border pt-10 md:pt-0 md:mt-0 mt-10 md:pl-10 flex flex-col gap-10"
          >
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground text-sm border-border">
                Contact
              </div>
              <div className="flex gap-3 items-center text-sm md:text-base ">
                <div className="relative p-2">
                  <PhoneCall size={15} className="opacity-50" />
                </div>

                <span>+82 10 5027 8530</span>
              </div>
              <div className="flex gap-3 items-center text-sm md:text-base">
                <div className="relative p-2">
                  <Mail size={15} className="opacity-50" />
                </div>

                <span>squirrel309@naver.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground text-sm  border-border">
                Social
              </div>
              <div className="flex flex-col gap-3">
                {MY_LINKS.map((btn, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer overflow-hidden"
                    onClick={() => window.open(btn.to)}
                  >
                    <div
                      // style={{ backdropFilter: "blur(10px)" }}
                      className="  duration-300 group-hover:shadow-lg flex items-center justify-between rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r  rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                          ></div>
                          <div className="relative p-2">
                            <btn.svg className="size-4 fill-white/80 group-hover:fill-white transition-all duration-300" />
                          </div>
                        </div>
                        <div>
                          <span className="text-white text-sm font-medium group-hover:text-indigo-200 transition-colors">
                            {btn.label}
                          </span>
                          <div className="text-xs text-gray-400 transition-colors">
                            {btn.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HomeContact;
