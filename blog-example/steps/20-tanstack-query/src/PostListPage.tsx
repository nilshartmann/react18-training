import React from "react";
import { useQuery } from "react-query";
import { loadBlogPosts } from "./blog-api";
import PostList from "./PostList";

export default function PostListPage() {
  const { data: posts, isLoading, error } = useQuery(["posts"], loadBlogPosts);

  if (isLoading) {
    return <h1>Loading, please wait...</h1>;
  }

  if (error) {
    console.error(error);
    return <h1>Loading failed</h1>;
  }

  return <PostList posts={posts!} />;
}
