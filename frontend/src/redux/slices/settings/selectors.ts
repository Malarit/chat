import { RootState } from "../..";

import { settings } from "./types";

export const selectValueByKey = (key: keyof settings) => (state: RootState) =>
  state.settingsReducer[key];

export const selectAll = (state: RootState) => state.settingsReducer;
