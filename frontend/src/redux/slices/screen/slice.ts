import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { screen, screens } from "./types";

const initialState: screen = {
  activeScreen: "MyPage",
};

export const screenSlice = createSlice({
  name: "Screen",
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<screens>) => {
      state.activeScreen = action.payload;
    },
  },
});

export const { setActiveScreen } = screenSlice.actions;

export default screenSlice.reducer;
