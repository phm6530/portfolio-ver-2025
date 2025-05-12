import Motion from "@/component/animations/Motion";
import BoardCommentForm from "@/features/Board/BoardCommentForm/BoardCommentForm";
import BoardCommentList from "@/features/Board/BoardCommentList/BoardCommentList";
import { AnimatedBackgroundGlows } from "../about/tttt";
import SubNav from "@/components/shared/sub-nav";
import MessageSvg from "@/asset/chat.svg?react";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import DesignSvg from "@/asset/3d/brush.svg?react";
export default function Board(): JSX.Element {
  return (
    <>
      <main
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(145, 126, 210, 0.15) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(143, 147, 247, 0.15) 0%, transparent 55%)",
        }}
        className="min-h-screen bg-gradient-to-l from-[#332d38] to-[#554e58] relative bg-fixed text-white flex flex-col"
      >
        {" "}
        <AnimatedBackgroundGlows />
        <SidebarWrapper>
          <div className="flex-1 max-w-3xl border-b border-white/20">
            <div className="mb-5 animate-topIn ani-delay-0.2 opacity-0">
              {/* <MessageSvg className="size-13 mb-10 text-red-50 fill-red-50 [&>path]:fill-white" /> */}
              {/* <div className="text-xs uppercase tracking-wider text-white/60">
                DEV & Publisher
              </div> */}
              <div className="text-6xl font-light mt-4 bg-clip-text  bg-gradient-to-l from-white via-indigo-300 to-white text-transparent">
                Guest book
              </div>
            </div>
            <div className=" text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0">
              <p>한줄의 응원의 메세지는 저에게 큰 힘이 됩니다.</p>
            </div>

            <section className="z-1 mt-10 animate-topIn ani-delay-0.4 opacity-0">
              <div className="flex flex-col gap-3 mb-5">
                <p className="z-2 text-zinc-700 dark:text-zinc-400 text-sm max-w-[400px] leading-6 border-zinc-400 border-l pl-5">
                  bcrypt를 이용하여 HMAC으로 저장하고 있으며 <br />
                  해싱된 비밀번호 이외 어떠한 정보도 수집하지 않습니다.
                </p>
              </div>

              {/* addForm  */}
              <BoardCommentForm />

              {/* BoardComment */}
              <BoardCommentList />
            </section>
          </div>
        </SidebarWrapper>
      </main>
    </>
  );
}
