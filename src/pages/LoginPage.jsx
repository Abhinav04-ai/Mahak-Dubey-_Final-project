import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { validateEmail } from "../utils/validation.js";

export default function LoginPage() {
  const { user, signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!validateEmail(values.email)) nextErrors.email = "Enter a valid email address.";
    if (!values.password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await signIn(values);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setSubmitError(error.message || "We couldn't sign you in. Please try again.");
    }
  }

  return (
    <AuthShell subtitle="Welcome back">
      <p className="muted mt-2 text-sm">Sign in to pick up where you left off.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-medium">
          Email address
          <input
            autoComplete="email"
            className="field mt-2 h-12 px-3.5"
            name="email"
            onChange={updateField}
            placeholder="you@example.com"
            type="email"
            value={values.email}
          />
          {errors.email && <span className="mt-1 block text-xs text-rose-600">{errors.email}</span>}
        </label>

        <label className="block text-sm font-medium">
          Password
          <input
            autoComplete="current-password"
            className="field mt-2 h-12 px-3.5"
            name="password"
            onChange={updateField}
            placeholder="Enter your password"
            type="password"
            value={values.password}
          />
          {errors.password && <span className="mt-1 block text-xs text-rose-600">{errors.password}</span>}
        </label>

        {submitError && (
          <p className="error-box px-3 py-2.5 text-sm" role="alert">
            {submitError}
          </p>
        )}

        <button className="primary-button flex h-12 w-full items-center justify-center" disabled={isLoading} type="submit">
          {isLoading ? <Spinner label="Signing in..." /> : "Sign in"}
        </button>
      </form>

      <p className="muted mt-6 text-center text-sm">
        New to FocusFlow?{" "}
        <Link className="font-semibold text-[#6258e8] hover:underline" to="/signup">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
