import { useState } from "react";

// Persist a small piece of UI state, such as the selected color theme.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = window.localStorage.getItem(key);
    return savedValue === null ? initialValue : savedValue;
  });

  function updateValue(nextValue) {
    window.localStorage.setItem(key, nextValue);
    setValue(nextValue);
  }

  return [value, updateValue];
}
