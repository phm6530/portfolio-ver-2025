import axios from "axios";
import { toast } from "react-toastify";

const HTTP_METHOD = ["POST", "PUT", "PATCH"];

export const axiosApi = axios.create({
  baseURL: "https://blog.h-creations.com/api",
  timeout: 5000,
  // withCredentials: true,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method && HTTP_METHOD.includes(config.method)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 에러 처리
      console.log("인증에 실패했습니다. 로그인이 필요합니다.");
      // 로그인 페이지로 리다이렉트
      window.location.href = "/login";
      // 또는 스토어를 사용한다면: store.dispatch('auth/logout');
    } else if (error.response && error.response.status === 404) {
      // 404 Not Found 에러 처리
      console.log("요청한 리소스를 찾을 수 없습니다.");
      // 사용자에게 알림
      alert("요청하신 페이지나 데이터를 찾을 수 없습니다.");
      // 또는 에러 페이지로 이동
      // window.location.href = '/error/404';
    } else if (error.response && error.response.status === 500) {
      // 500 Internal Server Error 에러 처리
      console.log("서버 내부 오류가 발생했습니다.");
      // 사용자에게 알림
      alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      // 에러 로깅
      // errorLoggingService.logError(error);
    } else {
      // 기타 에러 처리
      console.log("알 수 없는 에러가 발생했습니다:", error.message);
      // 네트워크 연결 오류 확인
      if (error.message === "Network Error") {
        alert("네트워크 연결을 확인해주세요.");
      } else {
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }

    // 개발 환경에서는 상세 로그 출력
    if (process.env.NODE_ENV === "development") {
      console.error("API 오류 상세 정보:", error);
    }

    toast.error(error.message);
    return Promise.reject(error);
  }
);
