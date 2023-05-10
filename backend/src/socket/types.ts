import { Socket } from "socket.io";
import type { Server as HTTPSServer } from "https";
import type { Http2SecureServer } from "http2";
import http = require("http");

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export type server = http.Server | HTTPSServer | Http2SecureServer | number;

export type sosket = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export type send = {
  chatId: string;
  sideUserId: number;
  text: string;
  time: string;
};
