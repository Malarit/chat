import { get } from "../../../services/requests/types";

export type chat = get["chats"]["res"];

export interface chats {
  chats: chat[];
  activeChat: string | undefined;
  onlineUsers: number[];
}

export type chatType = chats & { chatActive: string };

export type set_message = {
  userId: number;
  text: string;
  time: string;
  chatId: string;
};

export type update_chat = { lastChatId: string; newChatId: string } & Omit<
  chat,
  "chatId"
>;
