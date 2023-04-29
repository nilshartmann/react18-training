import React, { useEffect } from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import LoadingIndicator from "./LoadingIndicator";
import { useAppDispatch, useAppSelector } from "./redux/redux-hooks";
import { loadPosts, savePost } from "./redux/posts-slice";
import { useNavigate } from "react-router-dom";

export default function PostEditorPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleSavePost(post: NewBlogPost) {
    await dispatch(savePost(post));
    navigate("/");
  }

  return <PostEditor onSavePost={handleSavePost} onClose={() => navigate("/")} />;
}
