import React from "react";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { useNavigate } from "react-router-dom";
import { useSavePostMutation } from "./redux/posts-slice-api";

export default function PostEditorPage() {
  const [savePost, savePostResult] = useSavePostMutation();
  const navigate = useNavigate();
  async function handleSavePost(post: NewBlogPost) {
    await savePost(post);
    navigate("/");
  }

  if (savePostResult.isLoading) {
    return <h2>Post is saving...</h2>;
  }

  return <PostEditor onSavePost={handleSavePost} onClose={() => navigate("/")} />;
}
