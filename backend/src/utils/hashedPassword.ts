import bcrypt from "bcrypt";

export const getHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifieHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
