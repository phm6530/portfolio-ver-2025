import NotfoundPage from "@/components/error/NotfoundPage";
import About from "@/page/about/About";
import Blog from "@/page/blog/Blog";
import Board from "@/page/Board/Board";
import Home from "@/page/Home";
import Project from "@/page/Project";

interface RoutePath {
  path: string;
  Component: React.ReactNode;
  subNav?: boolean; // 사이드바 여부
}

interface NavPage {
  path: string;
  pathName: string;
  AuthPage: boolean;
}

export const ROUTE_PATH: RoutePath[] = [
  { path: "/", Component: <Home />, subNav: false },
  { path: "/about", Component: <About /> },
  { path: "/project/*", Component: <Project /> },
  { path: "/board", Component: <Board /> },
  { path: "/blog/*", Component: <Blog /> },
  { path: "/*", Component: <NotfoundPage redirectPath={"/"} /> },
];

export const NAVPAGE_OBJECT: NavPage[] = [
  { path: "/", pathName: "HOME", AuthPage: false },
  { path: "/about", pathName: "ABOUT", AuthPage: false },
  { path: "/project", pathName: "PROJECT", AuthPage: false },
  { path: "/blog", pathName: "BLOG", AuthPage: false },
  { path: "/board", pathName: "BOARD", AuthPage: false },
];
