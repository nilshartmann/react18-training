import React from "react";
import PostEditor from "./PostEditor";
import { BlogPost, NewBlogPost } from "./types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function savePost(post: NewBlogPost): Promise<BlogPost> {
  return fetch("http://localhost:7000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  }).then(response => response.json());
}

export default function PostEditorPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationKey: ["new-post"],
    mutationFn: savePost,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["posts"] })
  });

  async function handleSave(newPost: NewBlogPost) {
    await saveMutation.mutateAsync(newPost);

    navigate("/");
  }

  return <PostEditor onSavePost={handleSave} onClose={() => navigate("/")} />;
}
