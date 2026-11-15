import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Header() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="app-shell border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 no-underline"
          aria-label="FocusFlow home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#6258e8] text-lg font-bold text-white">
            F
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-[var(--text)]">
              FocusFlow
            </span>
            <span className="muted hidden text-xs sm:block">Your day, in focus</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="muted hidden text-sm sm:block">
            Hello, <span className="font-semibold text-[var(--text)]">{user?.name}</span>
          </span>
          <button
            className="soft-button grid h-10 w-10 place-items-center text-lg"
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          <button
            className="soft-button px-3 py-2 text-sm font-medium sm:px-4"
            onClick={handleSignOut}
            type="button"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
