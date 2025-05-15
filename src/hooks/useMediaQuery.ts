import { useEffect, useState } from "react";

type ResponseView = "min-width" | "max-width";
type ResponseQueryString = `(${ResponseView}:${number}px)`;
export enum BREAKPOINT {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536,
}

export default function useMediaQuery(query: ResponseQueryString) {
  const [value, setValue] = useState<boolean>(false); //초기값

  useEffect(() => {
    const mediaQuery = matchMedia(query); // 문자열로 된 미디어 쿼리를 전달

    if (typeof window !== "undefined") {
      setValue(mediaQuery.matches);
    }
    function onChange(e: MediaQueryListEvent) {
      setValue(e.matches);
    }

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
