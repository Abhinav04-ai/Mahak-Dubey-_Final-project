export const TASK_FILTERS = [
  { value: "all", label: "All tasks" },
  { value: "active", label: "In progress" },
  { value: "completed", label: "Completed" },
];

export function filterTasks(tasks, { filter, search, priority }) {
  const query = search.trim().toLowerCase();

  return tasks
    .filter((task) => {
      if (filter === "active" && task.completed) return false;
      if (filter === "completed" && !task.completed) return false;
      if (priority !== "all" && task.priority !== priority) return false;

      return (
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    })
    .sort((first, second) => {
      if (first.completed !== second.completed) {
        return Number(first.completed) - Number(second.completed);
      }
      return first.dueDate.localeCompare(second.dueDate);
    });
}

export function getTaskCounts(tasks) {
  return {
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };
}

export function getTodayDate() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function formatDate(dateString) {
  if (!dateString) return "No due date";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}
