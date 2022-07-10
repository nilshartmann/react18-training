import React from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";

export default function PostEditorPage() {
  const navigate = useNavigate();
  function savePost(post: NewBlogPost) {
    fetch("http://localhost:7000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(_ => navigate("/"))
      .catch(err => console.error("Saving failed: " + err));
  }

  return <PostEditor onSavePost={savePost} />;
}
