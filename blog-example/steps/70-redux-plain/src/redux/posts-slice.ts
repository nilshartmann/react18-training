import { BlogPost, NewBlogPost } from "../types";
import { AsyncAppThunk } from "./store";

type PostsState = { posts: BlogPost[] };

const initialPostsState: PostsState = {
  posts: []
};

function postsLoading() {
  return { type: "posts/loading" } as const;
}

type PostsLoadingAction = ReturnType<typeof postsLoading>;

function postLoadingFailed(error: any) {
  return { type: "posts/loadingFailed", error: error.toString() } as const;
}

type PostLoadingFailedAction = ReturnType<typeof postLoadingFailed>;

function postLoadingSucceeded(postsLoaded: BlogPost[]) {
  return {
    type: "posts/loadingSucceeded",
    posts: postsLoaded
  } as const;
}

type PostLoadingSucceededAction = ReturnType<typeof postLoadingSucceeded>;

function addPost(post: BlogPost) {
  return {
    type: "posts/add",
    post
  } as const;
}

type AddPostAction = ReturnType<typeof addPost>;

type PostAction =
  | PostsLoadingAction
  | PostLoadingFailedAction
  | PostLoadingSucceededAction
  | AddPostAction;

export function loadPosts(): AsyncAppThunk {
  return async dispatch => {
    dispatch(postsLoading());
    try {
      const response = await fetch("http://localhost:7000/posts?slow");
      const json = await response.json();
      dispatch(postLoadingSucceeded(json));
    } catch (err) {
      dispatch(postLoadingFailed(err));
    }
  };
}

export function savePost(post: NewBlogPost): AsyncAppThunk<void> {
  return async dispatch => {
    dispatch(postsLoading());
    try {
      const response = await fetch("http://localhost:7000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      const newPost = await response.json();
      dispatch(addPost(newPost));
    } catch (err) {
      dispatch(postLoadingFailed(err));
    }
  };
}

export default function postsReducer(state = initialPostsState, action: PostAction) {
  switch (action.type) {
    case "posts/loading":
      return {
        loading: true,
        // preserve posts while loading
        posts: state.posts
      };
    case "posts/loadingFailed": {
      return {
        posts: [],
        error: action.error
      };
    }
    case "posts/add": {
      return { posts: [action.post, ...state.posts] };
    }

    case "posts/loadingSucceeded": {
      return {
        posts: action.posts
      };
    }
    default:
  }
  return state;
}
