import { io, Socket } from "socket.io-client";

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}

export type socket = Socket<DefaultEventsMap, DefaultEventsMap>;
