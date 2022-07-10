import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

type ProtectedPageProps = {
  children: React.ReactElement;
};
export default function ProtectedPage({ children }: ProtectedPageProps) {
  const auth = useAuthContext();
  const location = useLocation();

  if (auth.username) {
    // User ist angemeldet => Zugriff erlauben

    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{
        redirectAfter: location
      }}
      replace
    />
  );
}
