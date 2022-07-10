import React from "react";
import Post from "./Post";
import { useParams, Link } from "react-router-dom";
import { BlogPost } from "./types";

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = React.useState<BlogPost | null>(null);

  // TODO Übung "TanStack Query"
  // - ersetze den useEffect Aufruf durch "useQuery"
  //   Query Keys: "blogPost" und die postId
  //   Query Function: "loadBlogPost" ("./blog-api")
  // - Zeige eine Fehlermeldung an, wenn es einen Fehler gab
  // - Zeige eine Meldung an, während die Posts geladen werden
  // - Kannst Du verhindern, dass der Query für einen BlogPost
  //   erneut mehrfach ausgeführt werden, wenn der Post mehrfach
  //   angezeigt wird (z.B. bei Navigation PostPage für P1 -> Home -> PostPage für P1)
  //   - Du kannst die Query-Aufrufe im Netzwerk-Tab des Browsers überprüfen

  React.useEffect(() => {
    fetch(`http://localhost:7000/posts/${postId}`)
      .then(response => response.json())
      .then(json => {
        setPost(json);
      })
      .catch(err => console.error("Loading data failed: " + err));
  }, [postId]);

  if (post) {
    return (
      <>
        <Link className="Button" to="/">
          Home
        </Link>
        <Post post={post} />
      </>
    );
  }

  return <h1>Please wait, Post is loading</h1>;
}
