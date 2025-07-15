import { forwardRef } from "react";
import BlogSvg from "@/asset/blog.svg?react";
import GitSvg from "@/asset/git.svg?react";
import Kakao from "@/asset/kakao.svg?react";

import { ChevronRight, Mail, PhoneCall } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      data-bg
      ref={(el) => {
        if (el && ref && "current" in ref) {
          const arrayRef = ref.current!;
          if (!arrayRef.includes(el)) {
            arrayRef.push(el);
          }
        }
      }}
      className="h-screen  overflow-hidden flex bg-bottom flex-col bg-cover items-center justify-center bg-zinc-950  z-14 w-screen absolute "
    >
      <div
        data-bg
        className=" absolute top-0  w-full h-full bg-cover "
        style={{
          backgroundImage: `
      linear-gradient(#1d191ccc, rgb(24 22 22 / 55%)), url(/img/k12.jpg)
          `,
        }}
      />
      <div className="layout-center items-center mb-5 grid md:grid-cols-[2fr_1fr]">
        <div>
          <h1
            data-animate
            className="text-3xl md:text-5xl pt-100 md:pt-0   font-black  mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-5 "
          >
            Front-End <br></br> Publisher
          </h1>
          <div
            data-animate
            className="text-lg text-gray-300 leading-relaxed max-w-md"
          >
            <p className="mb-3">
              함께 혁신적인 웹 경험을 만들어보세요.
              <span className="text-violet-300 font-medium">
                {" "}
                언제든지 연락주세요!
              </span>
            </p>
            <p className="text-sm text-gray-400">
              React • Next.js • TypeScript • UI/UX
            </p>{" "}
            <Button
              className="text-xs p-6! px-5! flex gap-10 z-12 mt-20"
              size={"sm"}
              onClick={() => nav("/about")}
            >
              자세히보기 <ChevronRight size={12} />
            </Button>{" "}
          </div>
        </div>

        <div
          data-animate
          className="z-10 border-l border-border pl-15 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <div className="opacity-50 text-sm">Contact</div>
            <div className="flex gap-3 items-center ">
              <PhoneCall size={15} className="opacity-50" />
              <span>+82 10 5027 8530</span>
            </div>
            <div className="flex gap-3 items-center ">
              <Mail size={15} className="opacity-50" />
              <span>squirrel309@naver.com</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className=" opacity-50 text-sm">Social</div>
            <div className="flex flex-col gap-2">
              {MY_LINKS.map((btn, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() => window.open(btn.to)}
                >
                  <div
                    style={{ backdropFilter: "blur(10px)" }}
                    className="  duration-300 group-hover:shadow-lg flex items-center justify-between p-3 rounded-xl border article-hover"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${btn.color} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        ></div>
                        <div className="relative p-2">
                          <btn.svg className="size-5 fill-white/80 group-hover:fill-white transition-all duration-300" />
                        </div>
                      </div>
                      <div>
                        <span className="text-white font-medium group-hover:text-indigo-200 transition-colors">
                          {btn.label}
                        </span>
                        <div className="text-xs text-gray-400 transition-colors">
                          {btn.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HomeContact;
