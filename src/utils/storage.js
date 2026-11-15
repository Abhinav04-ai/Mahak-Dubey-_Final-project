// Keep JSON parsing and saving consistent for the app's localStorage data.
export function readStorage(key, fallback) {
  const savedValue = window.localStorage.getItem(key);
  if (savedValue === null) return fallback;

  try {
    return JSON.parse(savedValue);
  } catch {
    throw new Error(`Saved data for "${key}" is damaged. Clear this app's data and try again.`);
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
