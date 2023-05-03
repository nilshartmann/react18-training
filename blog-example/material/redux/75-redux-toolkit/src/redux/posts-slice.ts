import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogPost, NewBlogPost } from "../types";
import { AsyncAppThunk } from "./store";

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

export function loadPosts(): AsyncAppThunk {
  return async dispatch => {
    dispatch(postsSlice.actions.postsLoading());
    try {
      const response = await fetch("http://localhost:7000/posts?slow");
      const json = await response.json();
      dispatch(postsSlice.actions.postLoadingSucceeded({ posts: json }));
    } catch (err) {
      dispatch(postsSlice.actions.postLoadingFailed({ err: err!.toString() }));
    }
  };
}

export function savePost(post: NewBlogPost): AsyncAppThunk<void> {
  return async dispatch => {
    dispatch(postsSlice.actions.postsLoading());
    try {
      const response = await fetch("http://localhost:7000/posts?slow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      const newPost = await response.json();
      dispatch(postsSlice.actions.addPost({ post: newPost }));
    } catch (err) {
      dispatch(postsSlice.actions.postLoadingFailed({ err: err!.toString() }));
    }
  };
}

type AddPostAction = {
  post: BlogPost;
};

type PostLoadingSucceededAction = {
  posts: BlogPost[];
};

type PostLoadingFailedAction = {
  err: string;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    postsLoading(state) {
      state.loading = "pending";
    },
    postLoadingSucceeded(state, action: PayloadAction<PostLoadingSucceededAction>) {
      state.loading = "succeeded";
      state.posts = action.payload.posts;
    },
    postLoadingFailed(state, action: PayloadAction<PostLoadingFailedAction>) {
      state.loading = "failed";
      state.error = action.payload.err;
    },
    addPost(state, action: PayloadAction<AddPostAction>) {
      state.loading = "succeeded";
      state.posts.push(action.payload.post);
    }
  }
});

export default postsSlice.reducer;