import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogPost } from "../types";

// TODO: Baue eine Thunk Action zum Laden der Posts!

// Schritt 1: Erzeuge mit 'createAsyncThunk' eine Action zum Laden der Posts vom Endpunkt
//  http://localhost:7000/posts?slow
//
// - Die Thunk Action soll die geladenen Posts (TypeScript Typ: BlogPost[]) zurückliefern

// Schritt 2: Ergänze den postsSlice unten:
//   - Dieser soll zwei 'extraReducers' bekommen, die auf die 'fulfilled' bzw. 'pending'
//     Zustände der Thunk Action reagieren:
//     - bei 'pending' setzte den 'loading'-State des Slices auf 'pending'
//     - bei 'fulfilled' setzte den 'loading'-State des Slices auf 'succeeded'
//                       und setzte die geladenen BlogPosts in den State!
//     - optional kannst Du auch den 'rejected'-Status behandeln und den 'error' in den
//         Slice State setzen

// Schritt 3: Verwende den Slice in der PostListPage
//  - Die PostListPage enthält zzt die geladenenen Posts im lokalen Zustand
//  - Entferne den lokalen Zustand und ersetze ihn durch:
//     - dispatchen der Thunk Action (muss innerhalb von useEffect passieren)
//     - Auswahl der geladenen Posts aus dem PostsSlice

type PostsSliceState = {
  posts?: BlogPost[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: string;
};

const initialPostsState: PostsSliceState = {
  posts: [],
  loading: "idle"
};

export const loadPosts = createAsyncThunk("posts/load", async () => {
  const response = await fetch("http://localhost:7000/posts?slow");
  const json = (await response.json()) as BlogPost[];
  return json;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = "pending";
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.toString();
    });
  }
});

export default postsSlice.reducer;
