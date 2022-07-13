import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function loadPostsFromBackend() {
  const response = await fetch("http://localhost:7000/posts");
  if (!response.ok) {
    throw new Error("Could not load posts!");
  }
  return response.json();
}

async function savePostToBackend(newPost) {
  const response = await fetch("http://localhost:7000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  });
  if (!response.ok) {
    throw new Error("Could not save post!");
  }
  return response.json();
}

function App() {
  const queryClient = useQueryClient();
  const postResult = useQuery(["posts"], loadPostsFromBackend);
  const savePostMutation = useMutation(savePostToBackend);
  const [view, setView] = React.useState("LIST");

  if (postResult.status === "loading") {
    return <h1>Loading Posts...</h1>;
  }

  if (postResult.status === "error") {
    return <h1>Failed to load blog posts!</h1>;
  }

  function savePost(post) {
    savePostMutation.mutate(post, {
      onSuccess() {
        queryClient.invalidateQueries(["posts"]);
        setView("LIST");
      }
    });
  }

  if (view === "LIST") {
    return <PostList posts={postResult.data} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={savePost} />;
}

export default App;
