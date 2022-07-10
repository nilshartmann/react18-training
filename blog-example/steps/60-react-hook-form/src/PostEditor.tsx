import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "./AuthContext";
import { NewBlogPost } from "./types";

type PostEditorProps = {
  onSavePost(post: NewBlogPost): void;
};

type PostEditorFormState = {
  title: string;
  body: string;
};

export default function PostEditor(props: PostEditorProps) {
  const { register, handleSubmit, formState, reset } = useForm<PostEditorFormState>({
    mode: "onChange"
  });
  const authContext = useAuthContext();

  const saveButtonDisabled = !formState.isValid;

  function onSubmit(data: PostEditorFormState) {
    props.onSavePost({
      title: data.title,
      body: data.body
    });
  }

  function clear() {
    reset({
      title: "",
      body: ""
    });
  }

  const loginMsg = authContext.username
    ? `Logged in as ${authContext.username}`
    : `You're not logged in.`;

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <p>{loginMsg}</p>

      <label>
        Title
        <input {...register("title", { required: true })} />
      </label>
      {!formState.dirtyFields.title || formState.errors.title ? (
        <Message type="error" msg="Please fill title"></Message>
      ) : (
        <Message type="info" msg="Title correctly filled"></Message>
      )}

      <label>
        Body
        <textarea {...register("body", { required: true })} />
      </label>
      {!formState.dirtyFields.body || formState.errors.body ? (
        <Message type="error" msg="Please enter a body"></Message>
      ) : (
        <Message type="info" msg="Body correctly filled"></Message>
      )}

      <button onClick={clear}>Clear</button>
      <button onClick={handleSubmit(onSubmit)} disabled={saveButtonDisabled}>
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
