import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
import PostEditorPage from "./PostEditorPage";

function App() {
  // TODO:
  // - Wenn Du deinen AuthContextProvider implementiert hast,
  //   Füge hier die AuthContextProvider als neue Top-Level-Komponente
  //   hinzu
  // - Implementieren dann 'CurrentUser'

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
