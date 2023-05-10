import { Request } from "express";

export interface TypedRequest<T> extends Request<{}, {}, T, T> {
  body: T;
  query: T;
}

type authorization = {
  email: string;
  password: string;
};
export type auth = TypedRequest<authorization>;

type registration = {
  userName: string;
  password: string;
  email: string;
};
export type reg = TypedRequest<registration>;

type getUser = {
  id?: number;
};
export type userGet = TypedRequest<getUser>;

type putUser = {
  userName?: string;
  firstName?: string;
  secondName?: string;
  description?: string;
  poster?: string;
  avatar?: string;
};

export type userPut = TypedRequest<putUser>;

type postMessage = {
  sideUserId: number;
  text: string;
  time: string;
};
export type messagePost = TypedRequest<postMessage>;

type getMessages = {
  chatId: string;
};
export type messagesGet = TypedRequest<getMessages>;
