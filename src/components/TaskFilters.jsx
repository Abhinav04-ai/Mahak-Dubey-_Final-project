export default function TaskFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  priority,
  onPriorityChange,
}) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search tasks</span>
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-[var(--muted)]">
          ⌕
        </span>
        <input
          className="field h-11 pl-10 pr-4 text-sm"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          type="search"
        />
      </label>

      <label>
        <span className="sr-only">Task status</span>
        <select
          className="field h-11 px-3 text-sm sm:w-40"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="all">All tasks</option>
          <option value="active">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label>
        <span className="sr-only">Task priority</span>
        <select
          className="field h-11 px-3 text-sm sm:w-40"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
      </label>
    </section>
  );
}
