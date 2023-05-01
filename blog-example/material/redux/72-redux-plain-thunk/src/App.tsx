import React, { useEffect } from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import LoadingIndicator from "./LoadingIndicator";
import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import { loadPosts, savePost } from "./redux/posts-slice";

type VIEW = "LIST" | "ADD";

function App() {
  const [view, setView] = React.useState<VIEW>("LIST");
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  async function handleSavePost(post: NewBlogPost) {
    await dispatch(savePost(post));
    setView("LIST");
  }

  if (posts.loading === "idle") {
    return <LoadingIndicator>App is starting... Please wait.</LoadingIndicator>;
  }

  if (posts.loading === "pending") {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  if (view === "LIST") {
    return <PostList posts={posts.posts || []} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={handleSavePost} onClose={() => setView("LIST")} />;
}

export default App;
