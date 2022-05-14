import React from "react";

export default function PostEditor() {
  const [title, setTitle] = React.useState("");

  return (
    <div>
      <h1>Create Post</h1>

      <label>
        Title
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
        {title ? <p>Your current Input: {title}</p> : "Please enter a title"}
      </label>
    </div>
  );
}
