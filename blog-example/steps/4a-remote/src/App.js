import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import mockPosts from "./mock";

function App() {
  const [posts, setPosts] = React.useState(mockPosts);
  const [view, setView] = React.useState("LIST");

  function savePost(post) {
    fetch("http://localhost:7000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(newPost => {
        setPosts([newPost, ...posts]);
        setView("LIST");
      })
      .catch(err => console.error("Saving failed: " + err));
  }

  if (view === "LIST") {
    return <PostList posts={posts} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={savePost} />;
}

export default App;
