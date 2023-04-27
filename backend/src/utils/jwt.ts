import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config/config.js";

export const jwtSign = (data: any) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + config.jwt.ACCESS_TOKEN_AGE,
      data: data,
    },
    config.jwt.ACCESS_TOKEN_SECRET
  );

  return token;
};

export const jwtVerify = (token: string) => {
  return jwt.verify(token, config.jwt.ACCESS_TOKEN_SECRET) as JwtPayload;
};
