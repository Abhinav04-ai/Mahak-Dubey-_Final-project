import { Link } from "react-router-dom";

export default function AuthShell({ children, subtitle }) {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden min-h-[620px] overflow-hidden bg-[#6258e8] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[48px] border-white/10" />
          <Link className="relative flex items-center gap-3 text-white no-underline" to="/login">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-xl font-bold">F</span>
            <span className="text-lg font-bold">FocusFlow</span>
          </Link>
          <div className="relative max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              A calmer way to get things done
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Make space for the work that matters.
            </h1>
            <p className="mt-5 text-base leading-7 text-white/80">
              Keep your plans clear, your priorities visible, and your next step close at hand.
            </p>
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-6">
              “Small steps every day add up to remarkable results.”
            </div>
          </div>
          <p className="relative text-xs text-white/65">Simple plans. Steady progress.</p>
        </aside>

        <main className="flex items-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <Link to="/login" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#6258e8] lg:hidden">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#6258e8] text-white">F</span>
              FocusFlow
            </Link>
            <p className="text-sm font-semibold text-[#6258e8]">Welcome to FocusFlow</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{subtitle}</h2>
            {children}
            <p className="muted mt-8 text-center text-xs leading-5">
              Demo project: accounts and tasks are saved only in this browser.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
