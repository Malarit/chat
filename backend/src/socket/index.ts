import { parse } from "cookie";
import { Server } from "socket.io";

import { config } from "../config/config.js";
import ACTIONS from "./actions.js";

import { bdFindOne } from "../db/query.js";
import { Chat, ChatMessages, User } from "../models/models.js";

import { checkToken } from "../utils/verifyToken.js";

import { send, server, sosket } from "./types.js";

class Socket {
  io;
  users: { [key: number]: string[] } = {};

  constructor(server: server) {
    this.io = new Server(server, {
      cookie: true,
    });
  }

  send(socket: sosket) {
    socket.on(ACTIONS.CHAT.SEND, async (data: send) => {
      let cookief = socket.handshake.headers.cookie || "";
      let cookies = parse(cookief);

      const user = await checkToken(cookies[config.jwt.ACCESS_TOKEN_NAME]);
      if (!user) return;

      const { sideUserId, text, time, chatId } = data;
      let chat = await bdFindOne(Chat, {
        attributes: ["id"],
        where: {
          id: chatId,
        },
      });

      if (!chat) {
        await Chat.build({
          firstUser: user.id,
          secondUser: sideUserId,
        }).save();

        chat = await bdFindOne(Chat, {
          where: {
            firstUser: user.id,
            secondUser: sideUserId,
          },
        });

        const { avatar, firstName, secondName } = await bdFindOne(User, {
          where: {
            id: user.id,
          },
        });

        const newChat = {
          lastChatId: chatId,
          newChatId: chat.id,
          avatar,
          firstName,
          secondName,
          sideUserId: user.id,
        };

        socket.broadcast
          .to(this.users[sideUserId])
          .emit(ACTIONS.CHAT.NEWCHAT, newChat);
        socket.emit(ACTIONS.CHAT.NEWCHAT, { ...newChat, sideUserId });
      }

      ChatMessages.build({
        chat_id: chat.id,
        text,
        time,
        user_id: user.id,
      }).save();

      socket.broadcast.to(this.users[data.sideUserId]).emit(ACTIONS.CHAT.SEND, {
        chatId: chat.id,
        sideUserId: user.id,
        text,
        time,
      });
    });
  }

  isOnline(socket: sosket) {
    socket.on(ACTIONS.USER.ISONLINE, (usersId: number[]) => {
      const onlineUsers = Object.keys(this.users).filter((id) =>
        usersId.includes(Number(id))
      );
      socket.emit(ACTIONS.USER.ISONLINE, onlineUsers);
    });
  }

  online(socket: sosket) {
    socket.on(ACTIONS.USER.ONLINE, (userId) => {
      if (!this.users[userId]) this.users[userId] = [];

      this.users[userId].push(socket.id);
      this.io.sockets.emit(ACTIONS.USER.ONLINE, userId);
      this.offline(socket, userId);
    });
  }

  offline(socket: sosket, userId: number) {
    socket.on("disconnect", () => {
      if (!this.users[userId]) return;

      this.users[userId] = this.users[userId].filter(
        (socketId) => socketId !== socket.id
      );

      if (this.users[userId].length === 0) {
        this.io.sockets.emit(ACTIONS.USER.OFFLINE, userId);
        delete this.users[userId];
      }
    });
  }

  connect() {
    this.io.on("connection", (socket) => {
      this.send(socket);
      this.online(socket);
      this.isOnline(socket)

      console.log("socket connect");
    });
  }
}

export default Socket;
