export const setImgDomain = (url: string | undefined) => {
  if (!url) return;
  return "http://localhost:3106/" + url;
};
