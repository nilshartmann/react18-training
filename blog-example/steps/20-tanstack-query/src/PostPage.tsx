import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { loadBlogPost } from "./blog-api";

export default function PostPage() {
  const { postId } = useParams<"postId">();
  const {
    data: post,
    status,
    error
  } = useQuery(["blogPost", postId], () => loadBlogPost(postId!), {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  if (status === "loading") {
    return <h1>Please wait, Post is loading</h1>;
  }

  if (status === "error") {
    console.error(error);
    return <h1>Could not load Blog Post</h1>;
  }

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={post} />
    </>
  );
}
