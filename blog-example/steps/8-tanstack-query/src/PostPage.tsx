import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { BlogPost } from "./types";
import { loadBlogPost } from "./blog-api";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "./LoadingIndicator";

export default function PostPage() {
  const { postId } = useParams();
  const {
    data: post,
    error,
    isError,
    isSuccess
  } = useQuery({ queryKey: ["posts", postId], queryFn: () => loadBlogPost(postId!) });

  if (isError) {
    console.error(error);
    return <h1>Loading blog post failed!</h1>;
  }

  if (isSuccess) {
    return (
      <>
        <Link className="Button" to="/">
          Home
        </Link>
        <Post post={post} />
      </>
    );
  }

  return <LoadingIndicator>Please wait, Post is loading</LoadingIndicator>;
}
