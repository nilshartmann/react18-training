import React from "react";
import PostList from "./PostList";
import { useLoadPostsQuery } from "./redux/posts-slice-api";
import LoadingIndicator from "./LoadingIndicator";

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
