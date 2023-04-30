import { RootState } from "../..";

export const selectUserId = (state: RootState) => state.userReducer.userId;
