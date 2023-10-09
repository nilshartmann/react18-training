import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import PostListPage from "./PostListPage";
import PostPage from "./PostPage";
import NotFoundPage from "./NotFound";
import PostEditorPage from "./PostEditorPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PostListPage />
      },

      {
        path: "post/:postId",
        element: <PostPage />
      },
      {
        path: "add",
        element: <PostEditorPage />
      },

      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={routerConfig} />;
}
