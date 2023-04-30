import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/account/slice";
import windowReducer from "./slices/screen/slice";
import settingsReducer from "./slices/settings/slice";
import ChatsReducer from "./slices/chats/slice";

export const store = configureStore({
  reducer: {
    userReducer,
    windowReducer,
    settingsReducer,
    ChatsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
