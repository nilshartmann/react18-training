import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import LoadingIndicator from "./LoadingIndicator";

function App() {
  const [posts, setPosts] = React.useState([]);
  const [view, setView] = React.useState("LIST");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:7000/posts?slow")
      .then(response => response.json())
      .then(json => {
        setPosts(json);
      })
      .catch(err => console.error("Loading data failed: " + err))
      .finally(() => setIsLoading(false));
  }, []);

  function savePost(post) {
    setIsLoading(true);
    fetch("http://localhost:7000/posts?slow", {
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
      .catch(err => console.error("Saving failed: " + err))
      .finally(() => setIsLoading(false));
  }

  if (isLoading) {
    return <LoadingIndicator>Server Request running. Please wait.</LoadingIndicator>;
  }

  if (view === "LIST") {
    return <PostList posts={posts} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={savePost} />;
}

export default App;
