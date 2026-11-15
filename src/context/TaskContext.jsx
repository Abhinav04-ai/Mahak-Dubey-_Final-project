import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { readStorage, writeStorage } from "../utils/storage.js";

const TaskContext = createContext(null);

function getTasksKey(userId) {
  return `focusflow.tasks.${userId}`;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setStorageError("");
      return;
    }

    try {
      setTasks(readStorage(getTasksKey(user.id), []));
      setStorageError("");
    } catch (error) {
      setTasks([]);
      setStorageError(error.message);
    }
  }, [user]);

  function saveTasks(nextTasks) {
    if (!user) throw new Error("Sign in before changing tasks.");
    writeStorage(getTasksKey(user.id), nextTasks);
    setTasks(nextTasks);
    setStorageError("");
  }

  function addTask(taskDetails) {
    const task = {
      ...taskDetails,
      id: createId(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTasks([task, ...tasks]);
  }

  function updateTask(taskId, changes) {
    saveTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...changes } : task)));
  }

  function deleteTask(taskId) {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  }

  function toggleTask(taskId) {
    updateTask(taskId, {
      completed: !tasks.find((task) => task.id === taskId)?.completed,
    });
  }

  return (
    <TaskContext.Provider
      value={{ tasks, storageError, addTask, updateTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider.");
  return context;
}
