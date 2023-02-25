import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddBlogPostMutation, PostListPageDocument } from "./generated/graphql";
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
  const navigate = useNavigate();
  async function savePost(post: NewBlogPost) {
    const { data } = await mutate({
      variables: {
        postData: post
      },
      // Alternativen:
      //   - fetchPolicy in PostListPage ändern
      //   - pollingInterval in PostListPage
      //   - refetch-Button in PostListPage
      //   - Cache direkt ändern (kommt noch)
      refetchQueries: [
        {
          query: PostListPageDocument
        }
      ]
    });

    if (data?.newPost.blogPost) {
      navigate("/");
    }
  }

  const errorMessage = error ? error.toString() : data?.newPost.error;

  if (called && !errorMessage && !loading) {
    return <SuccessConfirmation />;
  }

  return <PostEditor onSavePost={savePost} error={errorMessage} />;
}
