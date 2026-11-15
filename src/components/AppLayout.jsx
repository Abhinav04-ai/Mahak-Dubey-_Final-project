import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function AppLayout() {
  return (
    <div className="app-shell min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="muted px-4 pb-6 text-center text-xs">
        FocusFlow · Make room for what matters
      </footer>
    </div>
  );
}
