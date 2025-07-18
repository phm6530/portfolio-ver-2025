// Rounter
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Route/AppRoute";

// layOut
import { ToastContainer } from "react-toastify";

import useAddTransition from "./hooks/useAddTransition";
import { useEffect, useLayoutEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import QueryProviderClient from "./react-query/query-provider";

function App(): JSX.Element {
  // 초기 다크모드 트랜지션효과 방지
  useAddTransition();
  //스크롤 비활성화
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  //페인트
  useLayoutEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight;

      console.log(vh);
      document.documentElement.style.setProperty("--vh", `${vh / 2}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <>
      {/* Query Provideer */}
      <QueryProviderClient>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>

        {/* Toast */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </QueryProviderClient>
    </>
  );
}

export default App;
