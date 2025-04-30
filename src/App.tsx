import "./global.css";
import "./style/editor.css";

// Rounter
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./Route/AppRoute";

// layOut

import { ToastContainer } from "react-toastify";
import { toastConfig } from "./config/toast";

import { queryClient } from "./react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import useAddTransition from "./hooks/useAddTransition";
import { useEffect } from "react";

function App(): JSX.Element {
  // 초기 다크모드 트랜지션효과 방지
  useAddTransition();
  //스크롤 비활성화
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      {/* redux */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
        <ToastContainer {...toastConfig} />
      </QueryClientProvider>
    </>
  );
}

export default App;
