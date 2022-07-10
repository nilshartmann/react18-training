import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { savePost } from "./blog-api";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";

export default function PostEditorPage() {
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useMutation(savePost, {
    onSuccess() {
      navigate("/");
    }
  });

  function handleSavePost(newPost: NewBlogPost) {
    mutate(newPost);
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  if (isLoading) {
    return <h1>Saving, please wait!</h1>;
  }

  return <PostEditor onSavePost={handleSavePost} />;
}
