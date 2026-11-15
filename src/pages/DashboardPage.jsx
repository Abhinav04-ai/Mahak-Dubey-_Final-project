import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskFilters from "../components/TaskFilters.jsx";
import TaskModal from "../components/TaskModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useTasks } from "../context/TaskContext.jsx";
import { filterTasks, getTaskCounts } from "../utils/taskUtils.js";

const initialControls = { filter: "all", search: "", priority: "all" };

function StatCard({ label, value, caption, accent }) {
  return (
    <article className="panel p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="muted text-sm font-medium">{label}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
      <p className="muted mt-1 text-xs">{caption}</p>
    </article>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, storageError, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [controls, setControls] = useState(initialControls);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [actionError, setActionError] = useState("");

  const visibleTasks = useMemo(
    () => filterTasks(tasks, controls),
    [tasks, controls],
  );
  const counts = useMemo(() => getTaskCounts(tasks), [tasks]);
  const completion = counts.total
    ? Math.round((counts.completed / counts.total) * 100)
    : 0;
  const hasFilters =
    Boolean(controls.search.trim()) ||
    controls.filter !== "all" ||
    controls.priority !== "all";

  function openCreateModal() {
    setEditingTask(null);
    setActionError("");
    setIsModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setActionError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function saveTask(values) {
    setActionError("");
    if (editingTask) {
      updateTask(editingTask.id, values);
    } else {
      addTask(values);
    }
  }

  function runTaskAction(action) {
    setActionError("");
    try {
      action();
    } catch (error) {
      setActionError(error.message || "That change could not be saved.");
    }
  }

  function handleDelete(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task || !window.confirm(`Delete "${task.title}"? This can't be undone.`)) return;
    runTaskAction(() => deleteTask(taskId));
  }

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-[#6258e8]">Your workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Good to see you, {user?.name?.split(" ")[0] || "there"}.
          </h1>
          <p className="muted mt-2 text-sm sm:text-base">
            One step at a time. Here's what's on your list.
          </p>
        </div>
        <button className="primary-button self-start px-4 py-3 text-sm sm:self-auto" onClick={openCreateModal} type="button">
          <span aria-hidden="true" className="mr-2 text-lg">+</span>
          New task
        </button>
      </section>

      <section aria-label="Task summary" className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="All tasks"
          value={counts.total}
          caption="Everything on your list"
          accent="bg-violet-500"
        />
        <StatCard
          label="In progress"
          value={counts.active}
          caption="Ready for your next step"
          accent="bg-amber-400"
        />
        <StatCard
          label="Completed"
          value={`${counts.completed} / ${counts.total}`}
          caption={`${completion}% of your tasks finished`}
          accent="bg-emerald-500"
        />
      </section>

      <section className="panel px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Overall progress</p>
          <p className="muted text-xs font-medium">{completion}%</p>
        </div>
        <div
          aria-label={`${completion}% of tasks completed`}
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={completion}
          className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-[#6258e8] transition-all duration-300"
            style={{ width: `${completion}%` }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold">Your tasks</h2>
            <p className="muted mt-1 text-sm">
              {visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"} shown
            </p>
          </div>
        </div>

        <TaskFilters
          filter={controls.filter}
          onFilterChange={(filter) => setControls((current) => ({ ...current, filter }))}
          onPriorityChange={(priority) => setControls((current) => ({ ...current, priority }))}
          onSearchChange={(search) => setControls((current) => ({ ...current, search }))}
          priority={controls.priority}
          search={controls.search}
        />

        {(storageError || actionError) && (
          <p className="error-box px-4 py-3 text-sm" role="alert">
            {storageError || actionError}
          </p>
        )}

        {visibleTasks.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onCreate={openCreateModal} />
        ) : (
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                onDelete={handleDelete}
                onEdit={openEditModal}
                onToggle={(taskId) => runTaskAction(() => toggleTask(taskId))}
                task={task}
              />
            ))}
          </div>
        )}

        {hasFilters && (
          <button
            className="muted text-sm font-medium hover:text-[#6258e8]"
            onClick={() => setControls(initialControls)}
            type="button"
          >
            Clear filters
          </button>
        )}
      </section>

      {isModalOpen && (
        <TaskModal
          onClose={closeModal}
          onSave={saveTask}
          task={editingTask}
        />
      )}
    </div>
  );
}
