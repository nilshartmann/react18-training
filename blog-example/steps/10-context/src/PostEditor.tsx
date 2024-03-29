import React from "react";
import { useAuthContext } from "./AuthContext";
import { NewBlogPost } from "./types";

type PostEditorProps = {
  onSavePost(post: NewBlogPost): void;
};

export default function PostEditor(props: PostEditorProps) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  // ----------------------------------------------------------------------
  //  - Frage den AuthContext ab
  const authContext = useAuthContext();

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  function clear() {
    setTitle("");
    setBody("");
  }

  //  - Gib im Formular eine Meldung aus,
  //    - wenn ein Benutzer eingeloggt ist, gib dessen username aus
  //    - wenn KEIN Benutzer eingeloggt, gib einen anderen Hinweis aus
  //      ("Sie sind nicht eingeloggt" o.ä.)
  const loginMsg = authContext.username
    ? `Logged in as ${authContext.username}`
    : `You're not logged in.`;

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <p>{loginMsg}</p>

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
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
      <button
        disabled={saveButtonDisabled}
        onClick={() => {
          props.onSavePost({
            title,
            body
          });
        }}
      >
        Save Post
      </button>
    </div>
  );
}

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};

function Message({ msg, type = "error" }: MessageProps) {
  const style: React.CSSProperties =
    type === "error" ? { color: "red", fontWeight: "bold" } : { color: "green" };

  return <p style={style}>{msg}</p>;
}
