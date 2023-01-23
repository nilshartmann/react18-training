import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import mockPosts from "./mock";

const BACKEND_URL = "http://localhost:7000/posts";

function App() {
  const [posts, setPosts] = React.useState(mockPosts);
  const [view, setView] = React.useState("LIST");

  function savePost(post) {
    // TODO:
    // Verwende 'fetch', um den neuen Blog-Post zu speichern.
    //  - Setz den 'content-type' auf 'application/json'
    //  - Schicke das post-Objekt als Payload
    //  - Die Antwort vom Server enthält den gespeicherten Post
    //    - Das Objekt musst du dann in die 'posts'-Liste im State
    //      einfügen.
  }

  if (view === "LIST") {
    return <PostList posts={posts} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={savePost} />;
}

export default App;
