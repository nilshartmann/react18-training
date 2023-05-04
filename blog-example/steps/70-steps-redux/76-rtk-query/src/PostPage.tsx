import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useGetPostQuery } from "./redux/posts-slice-api";
import LoadingIndicator from "./LoadingIndicator";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }

  const getPostQuery = useGetPostQuery(postId);

  if (getPostQuery.isUninitialized || getPostQuery.isLoading) {
    return <LoadingIndicator>Please wait, Post with Id {postId} is loading...</LoadingIndicator>;
  }

  if (getPostQuery.isError) {
    return <h2>Loading Post with Id {postId} failed 😟</h2>;
  }

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={getPostQuery.data} />
    </>
  );
}
