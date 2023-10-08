import * as React from "react";
import { useAuthContext } from "./AuthContext";

export default function CurrentUser() {
  const authContext = useAuthContext();

  if (!authContext.username) {
    return <button onClick={() => authContext.onLogin("Susi")}>Login</button>;
  }

  return <button onClick={() => authContext.onLogout()}>Logout</button>;
}
