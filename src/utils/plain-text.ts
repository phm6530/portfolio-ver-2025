export function getPlainText(html: string, slice?: 200) {
  const plainText = html.replace(/<[^>]*>?/gm, ""); // 태그 제거
  const summary = plainText.slice(0, slice);

  return summary;
}
