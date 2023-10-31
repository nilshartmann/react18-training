import React, { memo } from "react";
import moment from "moment";

import mockPosts from "./mock";

// ======================================================================================================
//  POST EDITOR
// ======================================================================================================

function useDataLoader(url) {
  const [dataState, setDataState] = React.useState({
    data: undefined,
    loading: true,
    error: null
  });

  React.useEffect(() => {
    setDataState({
      loading: true
    });

    fetch(url)
      .then(response => response.json())
      .then(blogPosts => {
        setDataState({
          data: blogPosts,
          loading: false
        });
      })
      .catch(e => {
        setDataState({ error: "Fehler" + e });
      });
  }, [url]);

  return dataState;
}

export default function App() {
  const [view, setView] = React.useState("LIST");
  const [draftPost, setDraftPost] = React.useState();
  const [counter, setCounter] = React.useState(0);

  const postState = useDataLoader("http://localhost:7000/posts/P1");
  const userState = useDataLoader("http://localhost:7000/user?slow");

  const handleCancel = React.useCallback(function handleCancel(draft) {
    setDraftPost(draft);
    setView("LIST");
  }, []);

  if (postState.loading) {
    return <h1>Please wait...</h1>;
  }

  if (postState.error) {
    return <h1>Fehler: {postState.error}</h1>;
  }

  if (view === "LIST") {
    return <PostList posts={postState.data} onAddPost={() => setView("EDITOR")} />;
  }

  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>Increase {counter}</button>
      <PostEditor
        draftPost={draftPost}
        onCancel={handleCancel}
        formTitle="PE "
        onSavePost={newBlogPost => {
          // const newPosts = [newBlogPost].concat(posts);

          fetch("http://localhost:7000/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newBlogPost)
          })
            .then(response => response.json())
            .then(savedBlogPost => {
              // const newPosts = [savedBlogPost, ...posts];
              // setPosts(newPosts);
              setView("LIST");
            });
        }}
      />
    </>
  );
}
function useWindowTitle(newTitle) {
  React.useEffect(() => {
    const oldWindowTitle = window.document.title;
    window.document.title = newTitle;

    return () => (window.document.title = oldWindowTitle);
  }, [newTitle]);
}
// Render Phase => virtual DOM
//  I--> Seiteneffekte VERBOTEN!
//
// Commit Phase => Browser DOM
//  I--> Seiteneffekte erlaubt!
//  I--> registrierte Seiteneffekte ausgeführt
function PostEditor({ draftPost, onCancel, onSavePost, formTitle }) {
  const [title, setTitle] = React.useState(draftPost?.title || "");
  const [body, setBody] = React.useState(draftPost?.body || "");

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  useWindowTitle("...");

  function clear() {
    setTitle("");
    setBody("");
  }

  return (
    <div className="Container">
      <h1>{formTitle}</h1>
      <label>
        Title
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea value={body} onChange={e => setBody(e.currentTarget.value)} />
      </label>
      {/* {body ? (
          <Message type="info" msg="Body correctly filled"></Message>
        ) : (
          <Message msg="Please enter a body"></Message>
        )} */}

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
      <button
        disabled={saveButtonDisabled}
        onClick={() =>
          onSavePost({
            title: title,
            body: body
          })
        }
      >
        Save Post
      </button>
      <button
        onClick={() =>
          onCancel({
            title: title,
            body: body
          })
        }
      >
        Cancel
      </button>
    </div>
  );
}

const Message = memo(function Message({ msg, type = "error" }) {
  // console.log("Message Komponente", msg, type);

  const style = type === "error" ? { color: "red", fontWeight: "bold" } : { color: "green" };

  return <p style={style}>{msg}</p>;
});

export function PostList({ posts, onAddPost }) {
  return (
    <>
      <button onClick={() => onAddPost()}>Add Post</button>

      {posts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
    </>
  );
}

function BlogPost({ post }) {
  return (
    <article className="Container">
      <p className="Date">{formattedDate(post.date)}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

function formattedDate(date) {
  return moment(date).format("DD.MM.YYYY");
}
