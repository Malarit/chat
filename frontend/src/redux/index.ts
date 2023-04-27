import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./slices/account/slice";
import windowReducer from "./slices/screen/slice";
import settingsReducer from "./slices/settings/slice";
import ChatReducer from "./slices/chat/slice";

export const store = configureStore({
  reducer: {
    userReducer,
    windowReducer,
    settingsReducer,
    ChatReducer,
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
