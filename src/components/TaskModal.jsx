import { useEffect, useState } from "react";
import { getTodayDate } from "../utils/taskUtils.js";
import { validateTask } from "../utils/validation.js";

const emptyValues = {
  title: "",
  description: "",
  dueDate: getTodayDate(),
  priority: "medium",
};

export default function TaskModal({ task, onClose, onSave }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
      });
    } else {
      setValues(emptyValues);
    }
  }, [task]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateTask(values);
    setErrors(validationErrors);
    setSaveError("");
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    try {
      await onSave({
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
      });
      onClose();
    } catch (error) {
      setSaveError(error.message || "The task could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <section
        aria-labelledby="task-modal-title"
        aria-modal="true"
        className="panel my-auto w-full max-w-lg p-5 sm:p-7"
        role="dialog"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6258e8]">
              Task details
            </p>
            <h2 className="mt-1 text-xl font-bold" id="task-modal-title">
              {isEditing ? "Edit task" : "Create a task"}
            </h2>
          </div>
          <button className="soft-button h-9 w-9" onClick={onClose} type="button" aria-label="Close dialog">
            ×
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="block text-sm font-medium">
            Task title
            <input
              autoFocus
              className="field mt-1.5 h-11 px-3"
              name="title"
              maxLength={80}
              onChange={updateField}
              placeholder="For example, prepare project slides"
              value={values.title}
            />
            {errors.title && <span className="mt-1 block text-xs text-rose-600">{errors.title}</span>}
          </label>

          <label className="block text-sm font-medium">
            Description <span className="muted font-normal">(optional)</span>
            <textarea
              className="field mt-1.5 min-h-24 resize-y px-3 py-2.5"
              name="description"
              maxLength={300}
              onChange={updateField}
              placeholder="Add a few helpful details..."
              value={values.description}
            />
            <span className="muted mt-1 block text-right text-xs">
              {values.description.length}/300
            </span>
            {errors.description && (
              <span className="mt-1 block text-xs text-rose-600">{errors.description}</span>
            )}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Due date
              <input
                className="field mt-1.5 h-11 px-3"
                name="dueDate"
                onChange={updateField}
                type="date"
                value={values.dueDate}
              />
              {errors.dueDate && <span className="mt-1 block text-xs text-rose-600">{errors.dueDate}</span>}
            </label>

            <label className="block text-sm font-medium">
              Priority
              <select
                className="field mt-1.5 h-11 px-3"
                name="priority"
                onChange={updateField}
                value={values.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          {saveError && (
            <p className="error-box px-3 py-2 text-sm" role="alert">
              {saveError}
            </p>
          )}

          <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
            <button className="soft-button px-4 py-2.5 text-sm font-medium" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="primary-button min-w-28 px-4 py-2.5 text-sm" disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : isEditing ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
