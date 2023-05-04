import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import editor from "./editor-slice";
import { postsApi } from "./posts-slice-api";
import posts from "./posts-slice-thunk";

export const store = configureStore({
  reducer: {
    editor,

    // in einer richtigen App würdest Du nur 'posts' ODER 'postsApi' verwenden!
    posts,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action<string>>;
export type AsyncAppThunk<R = void> = ThunkAction<Promise<R>, RootState, unknown, Action<string>>;
