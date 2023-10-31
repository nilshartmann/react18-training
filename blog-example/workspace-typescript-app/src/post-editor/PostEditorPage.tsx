import React from "react";
import { useNavigate } from "react-router-dom";
import PostEditor from "./PostEditor";
import { NewBlogPost } from "../types";

export default function PostEditorPage() {
  const navigate = useNavigate();

  // TODO Übung "TanStack Query"
  // - ersetze den fetch-Aufruf durch "useMutation"
  //     Mutation-Function: "savePost" ("./blog-api")
  //     Typ-Parameter:
  // - Zeige eine Fehlermeldung an, wenn es einen Fehler gab
  // - Zeige eine Meldung an, während der neue Post gespeichert wird
  // - Wenn die Mutation erfolgreich war, soll die Root-Page ("/")
  //   aufgerufen werden (mit navigate von react-router-dom)

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

  return <PostEditor onSavePost={savePost} />;
}
