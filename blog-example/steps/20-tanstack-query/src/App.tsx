import React from "react";
import { Route, Routes } from "react-router-dom";
import PostPage from "./PostPage";
import PostListPage from "./PostListPage";
import NotFoundPage from "./NotFound";
import Page from "./Page";
import AuthContextProvider from "./AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import PostEditorPage from "./PostEditorPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
