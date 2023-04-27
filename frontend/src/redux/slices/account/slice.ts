import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isLanguage, language } from "../../../config/languages";
import { user } from "./types";
import axi from "./../../../services/requests/requests";

export const fetchItsMe = createAsyncThunk<{ id: number }>(
  "user/fetchUserStatus",
  async () => {
    return axi.get.itsMe();
  }
);

const initialState: user = {
  userId: undefined,
  language: undefined,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | undefined>) => {
      state.userId = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string | language>) => {
      const lang = action.payload;

      isLanguage(lang) && (state.language = lang);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItsMe.fulfilled, (state, action) => {
        state.userId = action.payload.id;
      })
      .addCase(fetchItsMe.rejected, (state, action) => {
        state.userId = undefined;
      });
  },
});

export const { setUserId, setLanguage } = userSlice.actions;

export default userSlice.reducer;
