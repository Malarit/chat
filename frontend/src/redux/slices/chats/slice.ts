import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

import axi from "../../../services/requests/requests";
import objToArray from "./../../../../../backend/src/utils/objToArray";

import { chat, chats, set_message, update_chat } from "./types";

export const fetchChats = createAsyncThunk("chat/fetchChatStatus", async () => {
  return axi.get.chats();
});

const initialState: chats = {
  chats: [],
  activeChat: undefined,
  onlineUsers: [],
};

export const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    addChat: (
      state,
      action: PayloadAction<Omit<chat, "chatId" | "messages">>
    ) => {
      const chat = state.chats.find(
        (chat) => chat.sideUserId === action.payload.sideUserId
      );
      let chatId = chat?.chatId;

      if (!chat) {
        chatId = v4();
        state.chats.push({ ...action.payload, chatId, messages: [] });
      }

      state.activeChat = chatId;
    },
    updateChatId: (state, action: PayloadAction<update_chat>) => {
      const { lastChatId, newChatId, ...actionChat } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === lastChatId);

      if (chat) {
        chat.chatId = newChatId;
        state.activeChat = newChatId;
        return;
      }
      state.chats.push({ ...actionChat, chatId: newChatId, messages: [] });
    },
    setMessage: (state, action: PayloadAction<set_message>) => {
      const { userId, chatId, ...message } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.messages.push({ ...message, user_id: userId });
      }
    },
    setOnlineUsers: (state, action: PayloadAction<number | number[]>) => {
      const users = action.payload;
      if (Array.isArray(users)) {
        state.onlineUsers = state.onlineUsers.filter(
          (id) => !users.includes(id)
        );
        return;
      }
      if (!state.onlineUsers.includes(users)) state.onlineUsers.push(users);
    },
    removeOnlineUser: (state, action: PayloadAction<number>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (userId) => userId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        const chatsId = objToArray(action.payload, "chatId") as string[];
        const newChats = state.chats.filter(
          (chat) => !chatsId.includes(chat.chatId)
        );
        state.chats = newChats.concat(action.payload);
      })
      .addCase(fetchChats.rejected, (state, action) => {});
  },
});

export const {
  setMessage,
  setActiveChat,
  addChat,
  updateChatId,
  setOnlineUsers,
  removeOnlineUser,
} = chatsSlice.actions;

export default chatsSlice.reducer;
