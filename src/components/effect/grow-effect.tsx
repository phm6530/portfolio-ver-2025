type ROUTE_KEY = "" | "about" | "project" | "blog" | "board";

type PATHNAME<T> = Record<ROUTE_KEY, T>;

const ROUTE_COLORS: PATHNAME<{ primary: string; secondary: string }> = {
  "": {
    primary: "bg-gradient-to-b to-indigo-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/20",
  }, // 홈
  about: {
    primary: "bg-gradient-to-b to-violet-500/40 from-violet-50/60",
    secondary: "bg-gradient-to-t to-rose-900/30 from-blue-500/30",
  }, // About 페이지
  project: {
    primary: "bg-gradient-to-b to-indigo-900/50 from-teal-400/100",
    secondary: "bg-violet-400/20",
  }, // Project 페이지
  blog: {
    primary: "bg-gradient-to-b to-indigo-900/50 from-violet-50/100",
    secondary: "bg-violet-400/20",
  }, // Blog 페이지
  board: {
    primary: "bg-gradient-to-b to-red-500/15 from-violet-50/60",
    secondary: "bg-gradient-to-t to-indigo-900/30 from-violet-50/10",
  }, // Board 페이지
};

export default function GrowEffect({ pageKey }: { pageKey: ROUTE_KEY }) {
  const currentColors = ROUTE_COLORS[pageKey];

  return (
    <>
      <div
        className={`glow-5 z-5 absolute pointer-events-none md:-top-4/5 -top-2/5 right-1 size-1/2 md:size-200 ${currentColors.primary} blur-[100px] rounded-full transition-colors duration-700`}
      />
      <div
        className={`glow-5 z-1 fixed pointer-events-none -bottom-70 -left-1/4 size-1/2 md:size-150 ${currentColors.secondary} blur-[100px] rounded-full transition-colors duration-700`}
      />
    </>
  );
}
