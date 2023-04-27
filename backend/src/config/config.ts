import * as dotenv from "dotenv";
dotenv.config();

import Cors from "../utils/cors.js";
import { isDialect } from "./service.js";
import { CookieOptions } from "express";

// Headers
const headers = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  "Access-Control-Allow-Credentials": "true",
};

export const cors = new Cors(headers).setHeader();

// from .env
const env = process.env;
export const config = {
  server: {
    PORT: env.PORT || 3001,
    HOST: env.HOST || "localhost",
  },
  db: {
    DATABASE: env.DATABASE || "postgres",
    USERNAME: env.USERNAME || "postgres",
    PASSWORD: env.PASSWORD,
    DIALECT: isDialect(env.DIALECT || "postgres"),
    HOST: env.HOST || "localhost",
  },
  jwt: {
    ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_NAME: env.ACCESS_TOKEN_NAME || "access_token",
    ACCESS_TOKEN_AGE: Number(env.ACCESS_TOKEN_AGE) || 3600,
  },
};

// jwt
export const cookie: CookieOptions = {
  // maxAge: 3600000,
  sameSite: "none",
  secure: true,
  domain: "localhost",
};
