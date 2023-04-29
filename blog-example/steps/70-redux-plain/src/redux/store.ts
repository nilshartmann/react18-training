import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import editor from "./editor-slice";
import posts from "./posts-slice";

export const store = configureStore({
  reducer: {
    editor,
    posts
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action<string>>;
export type AsyncAppThunk<R = void> = ThunkAction<Promise<R>, RootState, unknown, Action<string>>;
