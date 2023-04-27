import { RootState } from "../../";

export const selectUserId = (state: RootState) => state.userReducer.userId;

export const selectLanguage = (state: RootState) => state.userReducer.language;
