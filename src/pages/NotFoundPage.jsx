import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="app-shell grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6258e8]">404</p>
        <h1 className="mt-3 text-3xl font-bold">This page took a wrong turn.</h1>
        <p className="muted mt-2">The page you're looking for doesn't exist.</p>
        <Link className="primary-button mt-6 inline-flex px-5 py-3 text-sm no-underline" to="/dashboard">
          Back to FocusFlow
        </Link>
      </div>
    </main>
  );
}
