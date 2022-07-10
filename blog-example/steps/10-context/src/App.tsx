import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
import AuthContextProvider from "./AuthContext";
import PostEditorPage from "./PostEditorPage";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<PostListPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/add" element={<PostEditorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
