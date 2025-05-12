"use client";

// 움직이는 배경 글로우 컴포넌트
export const AnimatedBackgroundGlows = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 클래스명 수정: grow -> glow */}
      <div className="glow-1 absolute -top-10 -right-10 w-60 h-60 bg-sky-500/30 blur-[80px] rounded-full"></div>
      <div className="glow-2 absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full"></div>
      <div className="glow-3 absolute bottom-1/3 right-1/3 w-60 h-60 bg-indigo-600/30 blur-[100px] rounded-full"></div>
    </div>
  );
};
