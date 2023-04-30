import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chats } from "./types";

const initialState: chats[] = [];

export const ChatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<any>) => {
      
    },
  },
});

export const { setActiveChat } = ChatsSlice.actions;

export default ChatsSlice.reducer;
