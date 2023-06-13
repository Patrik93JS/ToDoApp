import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers";
import { nextReduxCookieMiddleware } from "next-redux-cookie-wrapper";
import { tokenSlice } from "./slices/tokenSlice";
import { appApi } from "./api";

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        nextReduxCookieMiddleware({
          subtrees: [tokenSlice.name],
          compress: false,
          sameSite: "lax",
        })
      )
      .concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
