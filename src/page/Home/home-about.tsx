import { Button } from "@/components/ui/button";
import { ChevronRight, Users } from "lucide-react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutPanelLeft, Terminal } from "lucide-react";
const HomeAbout = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();
  const about_cont = [
    {
      icon: LayoutPanelLeft,
      title: "퍼블리싱",
      description: `Tailwind CSS, Styled-components, SCSS 등 다양한 스타일링 도구에 익숙하며, shadcn-ui와 GSAP, Framer Motion을 활용한 인터랙티브한 UI 구현에 흥미가 많습니다.`,
    },
    {
      icon: Terminal,
      title: "프론트엔드 개발",
      description: `React/Next.js 기반의 구조 설계와 캐싱 등 상태를 깊게 이해하여 단순구현보다 원리를 아는 것에 즐거움을 느끼며, Nest와 Express를 이용한 Api 구축 경험을 통해 폭 넓은 시야로 바라볼 수 있는 개발자입니다.
    `,
    },
    {
      icon: Users,
      title: "협업 및 경험",
      description: `기획에서 개발 그리고 배포까지 마무리한 프로젝트 경험을 통해 각 영역의 고충을 이해합니다. 
    유연한 대처와 적극적인 소통으로 함께 성장하는 동료가 될 것입니다.`,
    },
  ];

  return (
    <section
      ref={(el) => {
        if (el) {
          if (ref && "current" in ref) {
            const arrayRef = ref.current!;
            if (!arrayRef.includes(el)) {
              arrayRef.push(el);
            }
          }
        }
      }}
      className="absolute"
    >
      {/* Wrapper */}
      <div className=" absolute">
        <div
          data-sec
          className="util-h-screen flex flex-col  items-center  bg-zinc-900 z-11 w-screen  overflow-y-auto util-scrollbar"
        >
          <div className="layout-center grid  pt-40 md:pt-40 pb-30">
            <div className="">
              <div className="">
                <h1
                  data-animate
                  className="text-5xl  md:text-6xl font-black  font-Montserrat mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-5 "
                >
                  About
                </h1>

                <div
                  data-animate
                  className="text-sm md:text-xl  mt-3  leading-relaxed"
                >
                  <p className="break-keep leading-relaxed">
                    프론트엔드 개발자 <strong>‘PHM’</strong>입니다. <br />
                    <span className="text-teal-300 text-lg">
                      'Next.js'
                    </span>,{" "}
                    <span className="text-teal-300 text-lg">'React'</span>를
                    주력으로 개발하고 있습니다. <br></br>
                  </p>
                </div>
              </div>{" "}
            </div>

            <div className="grid  md:grid-cols-3 gap-5 mt-10">
              {about_cont.map((e, idx) => {
                return (
                  <div
                    key={`abouts-${idx}`}
                    data-animate
                    className=" rounded-xl flex flex-col gap-4 border items-start border-border p-5 "
                  >
                    {" "}
                    <span className="text-3xl p-2 rounded-xl mb-4 bg-cyan-200/5 inline-block font-semibold  text-shadow text-shadow-amber-100">
                      <e.icon size={35} className="text-cyan-300" />
                    </span>
                    <h1 className="text-xl  border-border flex  items-center gap-3 mb-2">
                      {/* <PaintRoller className="text-cyan-300" /> */}

                      {/* <span className="text-lg text-cyan-300/80">/</span> */}

                      {e.title}
                    </h1>
                    <p className="whitespace-pre-line text-sm text-secondary-foreground/80 leading-relaxed break-keep">
                      {e.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div data-animate className=" mt-10 flex gap-2">
              {" "}
              <Button
                className="text-xs p-6! px-5! flex gap-10"
                size={"sm"}
                onClick={() => nav("/about")}
              >
                About me <ChevronRight size={12} />
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HomeAbout;
