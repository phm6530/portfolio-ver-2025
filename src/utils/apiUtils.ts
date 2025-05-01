import axios from "axios";
import { toast } from "react-toastify";

export async function requestHandler<T>(
  cb: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const { data } = await cb();
    return data;
  } catch (e) {
    const errMsg =
      axios.isAxiosError(e) && e.response?.data.message
        ? e.response.data.message
        : "알 수 없는 오류";
    toast.error(errMsg);
    throw e;
  }
}
