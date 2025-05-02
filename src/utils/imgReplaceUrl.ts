export const imgReplaceUrl = (url: string | null) => {
  return `${ENV.IMAGE_URL_PUBLIC}${url}`;
};
