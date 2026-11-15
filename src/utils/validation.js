export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateTask(values) {
  const errors = {};

  if (!values.title.trim()) errors.title = "Add a title for your task.";
  if (values.title.trim().length > 80) {
    errors.title = "Keep the title under 80 characters.";
  }
  if (values.description.trim().length > 300) {
    errors.description = "Keep the description under 300 characters.";
  }
  if (!values.dueDate) errors.dueDate = "Choose a due date.";
  if (!["low", "medium", "high"].includes(values.priority)) {
    errors.priority = "Choose a valid priority.";
  }

  return errors;
}
