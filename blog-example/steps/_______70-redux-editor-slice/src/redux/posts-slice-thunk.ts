import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogPost, NewBlogPost } from "../types";

// Note that the types generated by Redux Toolkit Thunk / Redux Toolkit Query
//  are more complex and more precise
type PostsSliceState = {
  posts: BlogPost[];
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

export const savePost = createAsyncThunk("posts/save", async (post: NewBlogPost, thunkApi) => {
  const response = await fetch("http://localhost:7000/posts?slow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  const newPost = await response.json();
  thunkApi.dispatch(postsSlice.actions.addPost({ post: newPost }));
});

type AddPostAction = {
  post: BlogPost;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    addPost(state, action: PayloadAction<AddPostAction>) {
      state.loading = "succeeded";
      state.posts.unshift(action.payload.post);
    }
  },
  extraReducers: builder => {
    builder.addCase(savePost.pending, state => {
      state.loading = "pending";
    });

    builder.addCase(loadPosts.pending, state => {
      state.loading = "pending";
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(savePost.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.toString();
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.toString();
    });
  }
});

export default postsSlice.reducer;
