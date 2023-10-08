import React from "react";
import { useQuery } from "react-query";
import { loadBlogPosts } from "./blog-api";
import PostList from "./PostList";

export default function PostListPage() {
  const { data: posts, status, error, fetchStatus } = useQuery(["posts"], loadBlogPosts);

  if (status === "loading") {
    // Initial loading, no data is in the cache yet
    return <h1>Loading, please wait...</h1>;
  }

  if (status === "error") {
    console.error(error);
    return <h1>Loading failed</h1>;
  }

  return (
    <div>
      {fetchStatus === "fetching" && <p>Data is updating...</p>}
      <PostList posts={posts} />
    </div>
  );
}
