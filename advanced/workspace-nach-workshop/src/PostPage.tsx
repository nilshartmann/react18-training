import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
import { useGetBlogPostQuery } from "./use-get-blog-post";

export default function PostPage() {
  const { postId } = useParams();

  if (!postId) {
    throw new Error("Param 'postId' missing!");
  }
  <React.Suspense fallback={<h1>Loading Blog Post...</h1>}>
    <PostPageInternal postId={postId} />
  </React.Suspense>;
}

function PostPageInternal({ postId }: { postId: string }) {
  const queryResult = useGetBlogPostQuery(postId);

  return (
    <>
      <Link className="Button" to="/">
        Home
      </Link>
      <Post post={queryResult.data} />
    </>
  );
}
