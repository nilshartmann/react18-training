import React from "react";
import { useDispatch } from "react-redux";
import { updateBody, updateTitle, clear } from "./redux/editor-slice";
import { useAppSelector } from "./redux/useAppSelector";
import { NewBlogPost } from "./types";

type PostEditorProps = {
  onSavePost(post: NewBlogPost): void;
};

export default function PostEditor(props: PostEditorProps) {
  const title = useAppSelector(state => state.editor.currentTitle);
  const body = useAppSelector(state => state.editor.currentBody);
  const dispatch = useDispatch();

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <label>
        Title
        <input
          value={title}
          onChange={e =>
            dispatch(
              updateTitle({
                newTitle: e.currentTarget.value
              })
            )
          }
        />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea
          value={body}
          onChange={e =>
            dispatch(
              updateBody({
                newBody: e.currentTarget.value
              })
            )
          }
        />
      </label>
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <button disabled={clearDisabled} onClick={() => dispatch(clear())}>
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
