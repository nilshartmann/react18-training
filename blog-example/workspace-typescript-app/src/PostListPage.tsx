import React from "react";
import PostList from "./PostList";

export default function PostListPage() {
  const [posts, setPosts] = React.useState([]);

  // TODO Übung "TanStack Query"
  // - ersetze den useEffect Aufruf durch "useQuery"
  //   Query Keys: "posts"
  // - Zeige eine Fehlermeldung an, wenn es einen Fehler gab
  //   Query Function: "loadBlogPosts" ("./blog-api")
  // - Zeige eine Meldung an, während die Posts geladen werden

  React.useEffect(() => {
    fetch("http://localhost:7000/posts?short")
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      })
      .catch(err => console.error("Loading data failed: " + err));
  }, []);

  if (!posts.length) {
    return <h1>Loading, please wait...</h1>;
  }

  return <PostList posts={posts} />;
}
