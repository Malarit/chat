import { RootState } from "../..";

export const selectActiveScreen = (state: RootState) =>
  state.windowReducer.activeScreen;
