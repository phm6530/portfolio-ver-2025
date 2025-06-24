import BoardCommentForm from "@/features/Board/BoardCommentForm/BoardCommentForm";
import BoardCommentList from "@/features/Board/board-commentlist";
import SidebarWrapper from "@/components/ui/sidebar-wrapper";
import { MessageSquareQuote } from "lucide-react";
import PageMainText from "@/components/ui/page-main-text";
export default function Board(): JSX.Element {
  return (
    <>
      <main className="bg-zinc-900">
        <SidebarWrapper>
          <div className="flex-1 max-w-3xl border-b border-white/20">
            <MessageSquareQuote size={40} className="text-teal-300 mb-3" />

            <PageMainText>
              GUEST BOOK<br></br>
            </PageMainText>

            <div className="mb-10 text-white/90 text-sm leading-relaxed  animate-topIn ani-delay-0.3 opacity-0 max-w-[600px] break-keep">
              <p>
                <span className="text-indigo-200"> "한줄의 응원의 메세지"</span>
                는 저에게 큰 힘이 됩니다.
              </p>
              <p>
                {" "}
                bcrypt를 이용하여 HMAC으로 저장하고 있으며 해싱된 비밀번호 이외
                어떠한 정보도 수집하지 않습니다.
              </p>
            </div>

            <section className="z-1 mt-10 animate-topIn ani-delay-0.4 opacity-0">
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
