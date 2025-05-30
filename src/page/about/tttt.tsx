"use client";

// 움직이는 배경 글로우 컴포넌트
export const AnimatedBackgroundGlows = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 별빛과 어울리는 색상으로 조정 */}
      <div className="glow-1 absolute -top-10 -right-10 w-60 h-60 bg-indigo-600/15 blur-[80px] rounded-full"></div>
      <div className="glow-2 absolute top-1/4 left-1/4 w-80 h-80 bg-blue-700/10 blur-[100px] rounded-full"></div>
      <div className="glow-3 absolute bottom-1/5 left-0 w-60 h-60 bg-purple-800/15 blur-[100px] rounded-full"></div>
    </div>
  );
};
