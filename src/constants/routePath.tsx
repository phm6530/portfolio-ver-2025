import NotfoundPage from "@/component/error/NotfoundPage";
import About from "@/page/about/About";
import Blog from "@/page/blog/Blog";
import Board from "@/page/Board/Board";
import Home from "@/page/Home";
import Project from "@/page/Project";

interface RoutePath {
  path: string;
  Component: React.ReactNode;
}

interface NavPage {
  path: string;
  pathName: string;
  AuthPage: boolean;
}

export const ROUTE_PATH: RoutePath[] = [
  { path: "/", Component: <Home /> },
  { path: "/about", Component: <About /> },
  { path: "/project/*", Component: <Project /> },
  // { path: '/myschedule/*', Component: <MySchedule /> },
  { path: "/board", Component: <Board /> },
  // { path: "/contact", Component: <Contact /> },
  { path: "/blog/*", Component: <Blog /> },
  // { path: "/Admin", Component: <AuthCheck /> },
  { path: "/*", Component: <NotfoundPage redirectPath={"/"} /> },
];

export const NAVPAGE_OBJECT: NavPage[] = [
  { path: "/", pathName: "HOME", AuthPage: false },
  { path: "/about", pathName: "ABOUT", AuthPage: false },
  { path: "/project", pathName: "PROJECT", AuthPage: false },
  // { path: '/myschedule', pathName: 'MY Calendar', AuthPage: true },
  { path: "/blog", pathName: "BLOG", AuthPage: false },
  { path: "/board", pathName: "BOARD", AuthPage: false },
  // { path: "/contact", pathName: "Contact", AuthPage: false },
  // { path: "/Admin", pathName: "Admin", AuthPage: true },
];
