import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chat } from "../../../components/chat/type";

const initialState: chat[] = [];

export const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<any>) => {},
  },
});

export const { setActiveChat } = ChatSlice.actions;

export default ChatSlice.reducer;
