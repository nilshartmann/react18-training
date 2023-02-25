import React from "react";
import PostList from "./PostList";
import { gql, useQuery } from "@apollo/client";

export default function PostListPage() {
  // ÜBUNG: useQuery
  //
  // -- Diese Seite soll die "Teaser" aller Blog Posts anzeigen

  //   1. Verwende die 'gql'-Funktion um den Query zu definieren
  //     (Den Query kannst Du aus der Datei PostListPage.query.graphql kopieren)
  //
  //   2. definiere einen TypeScript-Typen für das Ergebnis
  //     (Alle abgefragten Felder sind in TypeScript 'string')
  //
  //   3. Verwende 'useQuery' um den Query auszuführen
  //     - Während die Daten geladen werden, zeige eine Meldung an ("Bitte warten Sie")
  //     - Wenn es einen Fehler gibt, zeige eine Fehlermeldung an
  //     - Wenn die Daten geladen worden sind, übergib diese an die PostList-Komponente
  //       - Wenn es bei der Übergabe an 'PostList' einen Compile-Fehler gibt,
  //         ist wahrscheinlich dein TypeScript-Typ nicht korrekt
  //       - dank außerdem dran, dass 'data' auch undefined sein kann
  //         (in dem Fall einfach einen Fehler ausgeben)

  return <h1>We need to implement this ... </h1>;
}
