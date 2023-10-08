import React from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import { BlogPost } from "./types";

export default function PostPage() {
  const postId = null; // todo: 'postId'-Parameter aus der URL auslesen
  const [post, setPost] = React.useState<BlogPost | null>(null);

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
