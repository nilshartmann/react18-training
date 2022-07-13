import React from "react";
import PostList from "./PostList";
import PostEditor from "./PostEditor";
import { useMutation, useQuery, useQueryClient } from "react-query";

// -----------------------------------------------------------------
// "Query Functions" for useQuery and useMution
//
//  Note: in a "real" app they normally go into their own "api"
//    module, here I kept them for simplicity
//
// -----------------------------------------------------------------
async function loadPostsFromBackend() {
  const response = await fetch("http://localhost:7000/posts");
  if (!response.ok) {
    throw new Error("Could not load posts!");
  }
  return response.json();
}

async function savePostToBackend(newPost) {
  const response = await fetch("http://localhost:7000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  });
  if (!response.ok) {
    throw new Error("Could not save post!");
  }
  return response.json();
}

function App() {
  const queryClient = useQueryClient();
  const postResult = useQuery(["posts"], loadPostsFromBackend);
  const savePostMutation = useMutation(savePostToBackend);
  const [view, setView] = React.useState("LIST");

  // TODO:
  //   1. prüfe den "status" von postResult, und
  //       gib irgendeine Meldung aus, wenn die Daten geladen werden
  //       bzw. es einen Fehler gab
  //   2. Wenn es keinen Fehler gab, und die Daten nicht mehr
  //       geladen werden, übergib die geladenen Daten an die PostList
  //       Komponente (Aufruf unten vervollständigen, statt des leeren posts Arrays)

  function savePost(post) {
    // TODO:  - Erweitere die Mutation, so dass im Erfolgsfall:
    //           1. Der 'posts'-query invalidiert und neu ausgeführt wird
    //           2. der View wieder auf "LIST" gesetzt wird
    //        - Dazu musst Du 'mutate' als zweiten Parameter das Konfig-Objekt
    //          mit der 'onSuccess'-Callback-Funktion übergeben
    //
    savePostMutation.mutate(post);
  }

  if (view === "LIST") {
    // TODO: hier die gelesenen Posts übergeben!
    return <PostList posts={[]} onAddPost={() => setView("ADD")} />;
  }

  return <PostEditor onSavePost={savePost} />;
}

export default App;
