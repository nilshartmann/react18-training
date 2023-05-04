import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BlogPost } from "../types";

// ------------------------------------------------------------------------------------------
// ÜBUNG 1 RTK Query "QUERIES"
// ------------------------------------------------------------------------------------------
//
// SCHRITT 1: Vervollständige die 'postsApi'
//   - Implementiere zwei Endpunkte: 1. zum Laden der Post-Liste und 2. zum Laden
//             eines einzelnen Posts
//
//  - Die URL zum Server ist weiterhin http://localhost:7000
//  - Endpunkt "loadPosts" zum Laden aller Posts: "/posts" (oder "/posts?slow", um Loading Indicator sichtbar zu machen)
//     Rückgabe-Typ der geladenen Daten: BlogPost[]
//  - Endpunkt "getPost" zum Laden eines einzelnen Posts: "/posts/{postId}"
//     Rückgabe-Typ der geladenen Daten: BlogPost
//     Benötigter Parameter: postId (string) mit der Id des zu ladenen Posts
//
// SCHRITT 2: Verwende die beiden Endpunkte in der PostListPage und PostPage
//  - Ersetze den Data-Fetching-Code dort jeweils durch die beiden generierten
//     useXyzQueryHooks

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  endpoints: builder => ({
    loadPosts: builder.query<BlogPost[], void>({
      query: () => "/posts?slow"
    }),
    getPost: builder.query<BlogPost, string>({
      query: postId => `/posts/${postId}/?slow`
    })
  })
});

export const { useLoadPostsQuery, useGetPostQuery } = postsApi;

// Übung RTK Query "Mutations"

// ------------------------------------------------------------------------------------------
// ÜBUNG 2 RTK Query "MUTATIONS"
// ------------------------------------------------------------------------------------------
//
// SCHRITT 1: Vervollständige die 'postsApi'
//   - Implementiere einen Endpunkt "savePost" mit der Mutation zum Speichern eines neuen Blog Posts
//
//  - Die URL zum Server ist weiterhin http://localhost:7000
//  - Endpunkt zum Speichern des Posts: "/posts"
//     - HTTP-Methode: POST. Als Body den neuen Post übergeben
//
// SCHRITT 2: Verwende den Endpunkt in der PostEditorPage
//  - Ersetze den Data-Fetching-Code dort durch den generierten "useSavePostMutation"-Hook
//  - Achtung! Nach dem Speichern des Posts wird die PostList den neuen, gespeicherten
//     Post eventuell noch nicht anzeigen. Das liegt daran, dass wir den Cache noch nicht
//     aktualisieren!
//     Wenn Du mehr als 60 Sekunden den PostEditor offen hast und dann speicherst,
//     müsste die PostList aktualisiert werden, weil die Daten max. 60 Sekunden im Cache bleiben,
//     wenn keine Komponente mehr darauf zugreift.
//
// SCHRITT 3: (OPTIONAL): Erweitere den Slice um Cache-Tags
//  - Beim Laden der Posts setze einen (oder mehrere) Cache-Tags
//  - Beim Speichern eines Posts invalidiere die entsprechenden Cache-Tags
//  - Nach dem Speichern eines Posts sollte der neue Posts nun in der PostListe automatisch
//    angezeigt werden
