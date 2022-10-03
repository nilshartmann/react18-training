import * as React from "react";
import { Link } from "react-router-dom";
import { useAddBlogPostMutation } from "./generated/graphql";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";

function SuccessConfirmation() {
  return (
    <div className="Container">
      <h1>Your new post have been saved.</h1>
      <Link className="Button" to="/">
        Home
      </Link>
    </div>
  );
}

export default function PostEditorPage() {
  const [mutate, { error, data, called, loading }] = useAddBlogPostMutation();
  async function savePost(post: NewBlogPost) {
    mutate({
      variables: {
        postData: post
      }
    });
  }

  const errorMessage = error ? error.toString() : data?.newPost.error;

  if (called && !errorMessage && !loading) {
    return <SuccessConfirmation />;
  }

  return <PostEditor onSavePost={savePost} error={errorMessage} />;
}
