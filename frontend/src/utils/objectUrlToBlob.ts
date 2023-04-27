export const objectUrlToBlob = async (url: string) => {
  return fetch(url).then((req) => req.blob());
};
