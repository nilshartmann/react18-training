import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function RootLayout() {
  return (
    <div className="App">
      <AppHeader />

      <Outlet />
    </div>
  );
}
