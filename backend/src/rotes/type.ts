import { Request } from "express";

export interface TypedRequest<T> extends Request<{}, {}, T, T> {
  body: T;
  query: T;
}

type authorization = {
  email: string;
  password: string;
};
export type reqAuth = TypedRequest<authorization>;

type registration = {
  userName: string;
  password: string;
  email: string;
};
export type reqReg = TypedRequest<registration>;

type getUser = {
  id: number;
};
export type reqUserGet = TypedRequest<getUser>;

type putUser = {
  userName?: string;
  firstName?: string;
  secondName?: string;
  description?: string;
  poster?: string;
  avatar?: string;
};

export type reqUserPut = TypedRequest<putUser>;

type postMessage = {
  firstUser: number;
  secondUser: number;
  text: string;
  time: string;
};
export type reqMessagePost = TypedRequest<postMessage>;
