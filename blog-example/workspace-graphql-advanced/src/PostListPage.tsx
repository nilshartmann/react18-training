import React from "react";
import PostList from "./PostList";
import { useQuery } from "@apollo/client";
import { PostListPageDocument } from "./__generated__/graphql";

export default function PostListPage() {
  const { loading, data, error } = useQuery(PostListPageDocument);

  if (loading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Error! Loading failed!</h1>;
  }

  if (!data) {
    return <h1>No data found ???</h1>;
  }

  return <PostList posts={data.posts} />;
}
