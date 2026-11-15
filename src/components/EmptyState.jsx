export default function EmptyState({ hasFilters, onCreate }) {
  return (
    <div className="panel flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
        {hasFilters ? "⌕" : "✦"}
      </span>
      <h3 className="text-lg font-semibold">
        {hasFilters ? "No tasks match your search" : "A clear space to get started"}
      </h3>
      <p className="muted mt-2 max-w-sm text-sm leading-6">
        {hasFilters
          ? "Try another search or change the filters."
          : "Add your first task and turn your plans into progress."}
      </p>
      {!hasFilters && (
        <button className="primary-button mt-5 px-4 py-2.5 text-sm" onClick={onCreate} type="button">
          Create a task
        </button>
      )}
    </div>
  );
}
