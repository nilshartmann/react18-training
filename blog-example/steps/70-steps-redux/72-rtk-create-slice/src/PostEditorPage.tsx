import React from "react";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "./types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/redux-hooks";
import { shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";

export default function PostEditorPage() {
  return (
    <div>
      <ReduxExample />
      <Editor />
    </div>
  );
}

// re-select

function selectIsTitleEmpty(state: RootState) {
  return state.editor.currentTitle.length === 0;
}

function selectIsTitleTooLong(state: RootState) {
  return state.editor.currentTitle.length > 10;
}

const selectErrorMessage = createSelector(
  [selectIsTitleEmpty, selectIsTitleTooLong],

  (isTitleEmpty, isTitleTooLong) => {
    if (isTitleEmpty) {
      return {
        msg: "Bitte geben Sie einen Titel ein",
        level: "error",
        msg_en: "..:",
        msg_de: "...",
        msg_fr: "..."
      };
    } else if (isTitleTooLong) {
      return {
        msg: "Sie sollten einen prägnanten Titel eingeben",
        level: "warn",
        msg_en: "..:",
        msg_de: "...",
        msg_fr: "..."
      };
    }
    return null;
  }
);

function ReduxExample() {
  const info = useAppSelector(selectErrorMessage);
  // const info = useAppSelector(state => {
  //   if (state.editor.currentTitle.length === 0) {
  //     return { msg: "Bitte geben Sie einen Titel ein", level: "error" };
  //   } else if (state.editor.currentTitle.length > 10) {
  //     return { msg: "Sie sollten einen prägnanten Titel eingeben", level: "warn" };
  //   }
  //   return null;
  // }, shallowEqual);

  return (
    <div>
      {info?.msg ? (
        <p>
          {info.msg} ({info.level})
        </p>
      ) : (
        "Alles in Ordnung"
      )}
      .
    </div>
  );
}

function Editor() {
  const navigate = useNavigate();

  function savePost(post: NewBlogPost) {
    fetch("http://localhost:7000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(_ => navigate("/"))
      .catch(err => console.error("Saving failed: " + err));
  }

  return <PostEditor onSavePost={savePost} onClose={() => navigate("/")} />;
}
