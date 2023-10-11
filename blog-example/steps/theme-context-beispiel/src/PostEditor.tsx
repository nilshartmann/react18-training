import React from "react";
import Message from "./Message";
import { NewBlogPost } from "./types";
import { useThemeContext } from "./theme-context";

type PostEditorProps = {
  onSavePost(newBlogPost: NewBlogPost): void;
};
let postEditorToggleCounter = 0;

export default function PostEditor(props: PostEditorProps) {
  console.log("PostEditorRender", ++postEditorToggleCounter);

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  function clear() {
    setTitle("");
    setBody("");
  }

  return (
    <div className="Container">
      <h1>Create Post</h1>

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
      <ThemeToggle />
    </div>
  );
}

let themeToggleCounter = 0;
function ThemeToggle() {
  const theme = useThemeContext();
  console.log("ThemeToggleRender", ++themeToggleCounter);

  return (
    <button onClick={() => theme.setThemeName(theme.themeName === "light" ? "dark" : "light")}>
      Set Theme to {theme.themeName === "light" ? "dark" : "light"}
    </button>
  );
}
