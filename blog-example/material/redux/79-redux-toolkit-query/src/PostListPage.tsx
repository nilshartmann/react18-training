import React from "react";
import PostList from "./PostList";
import LoadingIndicator from "./LoadingIndicator";
import { useLoadPostsQuery } from "./redux/posts-slice";

export default function PostListPage() {
  const loadPostsQuery = useLoadPostsQuery();

  if (loadPostsQuery.isUninitialized) {
    return <LoadingIndicator>App is starting... Please wait.</LoadingIndicator>;
  }

  if (loadPostsQuery.isLoading) {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  if (loadPostsQuery.isError) {
    return <h1>Error while fetching data!</h1>;
  }

  return <PostList posts={loadPostsQuery.data} />;
}
