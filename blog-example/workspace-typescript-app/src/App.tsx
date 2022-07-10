import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
import PostEditorPage from "./PostEditorPage";

function App() {
  // TODO:
  // 1. Implementiere den AuthContextProvider (AuthContext.tsx)
  // 2. Wenn Du deinen AuthContextProvider implementiert hast,
  //    füge hier die AuthContextProvider als neue Top-Level-Komponente
  //    hinzu
  // 3. Implementiere dann die 'CurrentUser'-Komponente (CurrentUser.tsx)
  // 4. Erweitere dann den PostEditor (PostEditor.tsx)
  // (s. TODOs in den einzelnen Dateien)

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
