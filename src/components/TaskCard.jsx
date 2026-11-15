import { formatDate } from "../utils/taskUtils.js";

const priorityStyles = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className="panel task-enter flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-5">
      <button
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
          task.completed
            ? "border-[#6258e8] bg-[#6258e8] text-white"
            : "border-[var(--border)] text-transparent hover:border-[#6258e8]"
        }`}
        onClick={() => onToggle(task.id)}
        type="button"
        aria-label={task.completed ? `Mark ${task.title} as active` : `Complete ${task.title}`}
        aria-pressed={task.completed}
      >
        ✓
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`break-words font-semibold ${
              task.completed ? "muted line-through" : "text-[var(--text)]"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="muted mt-1.5 whitespace-pre-wrap break-words text-sm leading-5">
            {task.description}
          </p>
        )}
        <p className="muted mt-2 text-xs">Due {formatDate(task.dueDate)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-[var(--border)] pt-3 sm:border-0 sm:pt-0">
        <button
          className="soft-button px-3 py-2 text-sm font-medium"
          onClick={() => onEdit(task)}
          type="button"
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </button>
        <button
          className="soft-button px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
          onClick={() => onDelete(task.id)}
          type="button"
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
