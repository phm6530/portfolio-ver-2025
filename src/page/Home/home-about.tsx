import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const HomeAbout = forwardRef((_, ref: React.ForwardedRef<HTMLElement[]>) => {
  const nav = useNavigate();
  const about_cont = [
    {
      title: "퍼블리싱",
      description: `Tailwind CSS, Styled-components, SCSS 등 다양한 스타일링 도구에 익숙하며, 
    shadcn-ui와 GSAP, Framer Motion을 활용한 인터랙티브한 UI 구현에 흥미가 많습니다.`,
    },
    {
      title: "프론트엔드 개발",
      description: `React/Next.js 기반의 구조 설계와 캐싱 등 상태를 깊게 이해하여 단순구현보다 원리를 아는 것에 즐거움을 느끼며, Nest와 Express를 이용한 Api 구축 경험을 통해 폭 넓은 시야로 바라볼 수 있는 개발자입니다.
    `,
    },
    {
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
      className="h-screen flex flex-col justify-center items-center  bg-zinc-900 z-11 w-screen absolute overflow-y-auto"
    >
      <div className="layout-center grid  pt-40 md:pt-50 pb-30">
        <div className="mb-5">
          <div data-animate className="text-foreground font-Montserrat  ">
            <h1 className="text-5xl font-bold md:text-5xl font-Montserrat mt-3  tracking-wider leading-tight  flex items-center gap-2 group cursor-pointer  pb-2 ">
              ABOUT
            </h1>
          </div>

          <div data-animate className="flex flex-col gap-6 ">
            <div className="text-base md:text-xl flex flex-col gap-5 ">
              <p className="break-keep leading-relaxed">
                프론트엔드 개발자 <strong>‘PHM’</strong>입니다. <br />
                <span className="text-teal-300 text-lg">'Next.js'</span>,{" "}
                <span className="text-teal-300 text-lg">'React'</span>를
                주력으로 개발하고 있습니다. <br></br>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-15 mt-15">
          {about_cont.map((e, idx) => {
            return (
              <div key={`abouts-${idx}`} data-animate className=" rounded-lg ">
                <h1 className="text-base border-b pb-2 border-border flex  items-center gap-3 mb-3">
                  {/* <PaintRoller className="text-cyan-300" /> */}
                  <span className="text-3xl font-semibold opacity-50 text-shadow text-shadow-amber-100">
                    0{idx + 1}
                  </span>
                  <span className="text-lg text-cyan-300/80">/</span>

                  {e.title}
                </h1>
                <p className="whitespace-pre-line text-sm text-secondary-foreground/80 leading-relaxed break-keep">
                  {e.description}
                </p>
              </div>
            );
          })}
        </div>
        <div data-animate className=" mt-20 flex gap-2">
          {" "}
          <Button
            className="text-xs p-6! px-5! flex gap-10"
            size={"sm"}
            onClick={() => nav("/about")}
          >
            자세히보기 <ChevronRight size={12} />
          </Button>{" "}
        </div>
      </div>
    </section>
  );
});

export default HomeAbout;
