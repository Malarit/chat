import { io } from "socket.io-client";

const options = {
  "force new connection": true,
  "max reconnection attempts": "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io("http://localhost:3106/", options);

export default socket;
