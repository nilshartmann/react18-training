import React, { Suspense } from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { LikePostDocument, PostPageDocument } from "./__generated__/graphql";

function usePostPageParam() {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) {
    throw new Error("Missing postId in path");
  }

  return postId;
}

export default function PostPage() {
  const postId = usePostPageParam();

  return (
    <Suspense fallback={<h1>Please wait...</h1>}>
      <PostDisplay postId={postId} />
    </Suspense>
  );
}
type PostDisplayProps = {
  postId: string;
};
function PostDisplay({ postId }: PostDisplayProps) {
  const { data } = useSuspenseQuery(PostPageDocument, {
    variables: {
      postId: postId!
    }
  });

  const [likePost] = useMutation(LikePostDocument, {
    variables: { postId: postId! }
  });

  if (data.post) {
    return (
      <>
        <Link className="Button" to="/">
          Home
        </Link>
        <Post post={data.post} />

        <div>
          <p>{data.post.likes} likes</p>

          <button onClick={() => likePost()}>Like!</button>
        </div>
      </>
    );
  }

  return <h1>Post not found.</h1>;
}
