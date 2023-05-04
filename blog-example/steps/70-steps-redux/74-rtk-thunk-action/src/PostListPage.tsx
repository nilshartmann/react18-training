import React from "react";
import PostList from "./PostList";
import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import { loadPosts } from "./redux/posts-slice-thunk";

export default function PostListPage() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts);

  React.useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  if (posts.loading === "pending" || posts.loading === "idle") {
    return <h1>Loading, please wait...</h1>;
  }

  if (posts.loading === "failed") {
    return <h1>Loading posts failed</h1>;
  }

  if (!posts.posts) {
    // Das sollte eigentlich nicht vorkommen.
    // Für TypeScript ist das posts-Array hier aber "possibly 'undefined'", weil
    //  die Typ-Beschreibung von PostsSliceState etwas ungenau ist
    throw new Error("Posts are not loading, but posts in state is undefined!");
  }

  return <PostList posts={posts.posts} />;
}
