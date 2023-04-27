const regex = {
  langRemoveRegion: /\w+/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  latinAndNumbers: /^[a-zA-Z\d]{3,10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

export default regex;

export const customMatch = (
  str: string,
  regexp: RegExp | keyof typeof regex
): string => {
  let result: string | undefined = "";

  typeof regexp == "string"
    ? (result = str.match(regex[regexp])?.[0])
    : (result = str.match(regexp)?.[0]);

  if (!result) return "";

  return result;
};
