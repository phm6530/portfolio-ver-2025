import axios from "axios";
import { tokenResponseProps } from "@/type/AuthTypes";
import { ENDPOINT_URL } from "@/constants/apiUrl";
import { requestHandler } from "@/utils/apiUtils";

//로그아웃
const fetchLogout = async (token: string) => {
  const url = `${ENDPOINT_URL}/logout`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await requestHandler(() => axios.post(url, { headers }));
};

// 토큰체크
const tokenCheck = async (): Promise<tokenResponseProps> => {
  const token: string | null = localStorage.getItem("token");

  if (!token) {
    throw new Error("권한이 없습니다.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${ENDPOINT_URL}/auth`;
  return requestHandler<tokenResponseProps>(() =>
    axios.post(url, {}, { headers })
  );
};

export { tokenCheck, fetchLogout };
