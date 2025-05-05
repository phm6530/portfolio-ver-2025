import Motion from "@/component/animations/Motion";
import UserProfile from "@/component/profile/UserProfile";
import DashBoard from "@/component/ui/DashBoard/DashBoard";
import BoardCommentForm from "@/features/Board/BoardCommentForm/BoardCommentForm";
import BoardCommentList from "@/features/Board/BoardCommentList/BoardCommentList";

export default function Board(): JSX.Element {
  return (
    <>
      {/* Header */}
      <DashBoard
        pageTitle={"Board"}
        subComment={`한줄의 응원의 메세지는 저에게 큰 힘이 됩니다.`}
      />
      {/* Body */}{" "}
      <Motion.FadeInOut className="grid grid-cols-1 md:grid-cols-[300px_1fr] items-start gap-20 layout-center ">
        {/* Prifile */}
        <UserProfile />

        <section className="py-10">
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex gap-3 items-center">
              <img src="/public/img/board/talk2.png" className="size-6" />
              <h1
                className="text-3xl font-Poppins font-semibold bg-clip-text text-transparent
                        bg-gradient-to-b 
                        dark:from-white dark:via-white dark:to-blue-300 
                        from-black via-black to-blue-500
                      "
              >
                GUEST BOARD
              </h1>
            </div>

            <p className="text-sub text-sm max-w-[400px] leading-6 border-l-2 pl-5">
              bcrypt를 이용하여 HMAC으로 저장하고 있으며 <br />
              해싱된 비밀번호 이외 어떠한 정보도 수집하지 않습니다.
            </p>
          </div>

          {/* addForm  */}
          <BoardCommentForm />

          {/* BoardComment */}
          <BoardCommentList />
        </section>
      </Motion.FadeInOut>
    </>
  );
}
