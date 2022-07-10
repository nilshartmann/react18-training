import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

type ProtectedPageProps = {
  children: React.ReactElement;
};
export default function ProtectedPage({ children }: ProtectedPageProps) {
  // TODO Übung "Protected Pages"
  //
  // - Frage den AuthContext ab
  // - Frage die Location ab
  // - Wenn ein Benutzer angemeldet ist (username ist gesetzt),
  //   zeige die übergebene children-Komponente an
  // - anderfalls gib eine Navigate-Komponente zurück, die
  //     - nach "/login" weiterleitet
  //     - als 'redirectAfter' im state-Object das aktuelle location-Objekt enthäklt
  //       { redirectAfter: location }

  return <div>{children}</div>;
}
