import { createContext, useContext, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage.js";

const AuthContext = createContext(null);
const USERS_KEY = "focusflow.users";
const SESSION_KEY = "focusflow.session";

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return readStorage(SESSION_KEY, null);
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signUp({ name, email, password }) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 300));
      const users = readStorage(USERS_KEY, []);
      const normalizedEmail = email.trim().toLowerCase();

      if (users.some((savedUser) => savedUser.email === normalizedEmail)) {
        throw new Error("An account with this email already exists.");
      }

      const newUser = {
        id: createId(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      writeStorage(USERS_KEY, [...users, newUser]);
      const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      writeStorage(SESSION_KEY, safeUser);
      setUser(safeUser);
      return safeUser;
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn({ email, password }) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 300));
      const users = readStorage(USERS_KEY, []);
      const normalizedEmail = email.trim().toLowerCase();
      const match = users.find(
        (savedUser) =>
          savedUser.email === normalizedEmail && savedUser.password === password,
      );

      if (!match) throw new Error("Email or password is incorrect.");

      const safeUser = { id: match.id, name: match.name, email: match.email };
      writeStorage(SESSION_KEY, safeUser);
      setUser(safeUser);
      return safeUser;
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
