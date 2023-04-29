import React, { useEffect } from "react";
import PostList from "./PostList";
import { loadPosts } from "./redux/posts-slice";
import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import LoadingIndicator from "./LoadingIndicator";

export default function PostListPage() {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  if (posts.loading === "idle") {
    return <LoadingIndicator>App is starting... Please wait.</LoadingIndicator>;
  }

  if (posts.loading === "pending") {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  return <PostList posts={posts.posts} />;
}
