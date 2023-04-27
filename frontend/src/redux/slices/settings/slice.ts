import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { settings, setUpdatesValuesType } from "./types";

const initialState: settings = {};

export const settingsSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    setUpdatesValues: (state, action: PayloadAction<setUpdatesValuesType>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setUpdatesValues } = settingsSlice.actions;

export default settingsSlice.reducer;
