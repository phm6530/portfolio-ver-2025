import axios from "axios";

export async function requestHandler<T>(
  cb: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const { data } = await cb();
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("알 수 없는 오류");
    }
  }
}
