import React from "react";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { Route, Routes, useNavigate } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
function App() {
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

  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<PostListPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/add" element={<PostEditor onSavePost={savePost} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
