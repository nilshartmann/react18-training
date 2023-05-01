import React from "react";
import PostEditorPage from "./PostEditorPage";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<PostListPage />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/add" element={<PostEditorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
