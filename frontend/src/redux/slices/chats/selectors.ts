import { RootState } from "../..";
import objToArray from "./../../../utils/objToArray";

export const selectChats = (state: RootState) => state.chatsReducer.chats;

export const selectActiveChat = (state: RootState) =>
  state.chatsReducer.chats.find(
    (chat) => chat.chatId === state.chatsReducer.activeChat
  );

export const selectSideUsersId = (state: RootState) =>
  objToArray(state.chatsReducer.chats, "sideUserId") as number[];

export const selectMessages =
  (sideUserId: number | undefined) => (state: RootState) =>
    state.chatsReducer.chats.find((chat) => chat.sideUserId === sideUserId)
      ?.messages;

export const selectOnlineUsers = (state: RootState) =>
  state.chatsReducer.onlineUsers;
