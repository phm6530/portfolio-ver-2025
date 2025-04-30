import { IMG_URL } from "@/constants/apiUrl";

// 메모이제이션으로 변경
export class HtmlContentNormalizer {
  private static readonly imgSrcRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

  static getPost(contents: string) {
    return contents.replace(this.imgSrcRegex, (match, src) => {
      return match.replace(src, src.replaceAll(`${IMG_URL}/`, ""));
    });
  }

  static setImgUrl(contents: string) {
    // 모든 이미지 src 속성 변경
    const modifiedContent = contents.replace(this.imgSrcRegex, (match, src) => {
      return match.replace(src, `${IMG_URL}/${src}`);
    });

    return modifiedContent;
  }
}
