import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell.jsx";
import Spinner from "../components/Spinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { validateEmail, validatePassword } from "../utils/validation.js";

export default function SignupPage() {
  const { user, signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "" });
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
    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    if (values.name.trim().length > 50) nextErrors.name = "Keep your name under 50 characters.";
    if (!validateEmail(values.email)) nextErrors.email = "Enter a valid email address.";
    if (!validatePassword(values.password)) nextErrors.password = "Use at least 8 characters.";
    if (values.password !== values.confirmPassword) {
      nextErrors.confirmPassword = "The passwords do not match.";
    }
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await signUp(values);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setSubmitError(error.message || "We couldn't create your account. Please try again.");
    }
  }

  return (
    <AuthShell subtitle="Create your account">
      <p className="muted mt-2 text-sm">A few details and you're ready to plan your day.</p>
      <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block text-sm font-medium">
          Your name
          <input
            autoComplete="name"
            className="field mt-1.5 h-11 px-3.5"
            maxLength={50}
            name="name"
            onChange={updateField}
            placeholder="Alex Morgan"
            value={values.name}
          />
          {errors.name && <span className="mt-1 block text-xs text-rose-600">{errors.name}</span>}
        </label>

        <label className="block text-sm font-medium">
          Email address
          <input
            autoComplete="email"
            className="field mt-1.5 h-11 px-3.5"
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
            autoComplete="new-password"
            className="field mt-1.5 h-11 px-3.5"
            name="password"
            onChange={updateField}
            placeholder="At least 8 characters"
            type="password"
            value={values.password}
          />
          {errors.password && <span className="mt-1 block text-xs text-rose-600">{errors.password}</span>}
        </label>

        <label className="block text-sm font-medium">
          Confirm password
          <input
            autoComplete="new-password"
            className="field mt-1.5 h-11 px-3.5"
            name="confirmPassword"
            onChange={updateField}
            placeholder="Enter your password again"
            type="password"
            value={values.confirmPassword}
          />
          {errors.confirmPassword && (
            <span className="mt-1 block text-xs text-rose-600">{errors.confirmPassword}</span>
          )}
        </label>

        {submitError && (
          <p className="error-box px-3 py-2.5 text-sm" role="alert">
            {submitError}
          </p>
        )}

        <button className="primary-button flex h-12 w-full items-center justify-center" disabled={isLoading} type="submit">
          {isLoading ? <Spinner label="Creating account..." /> : "Create account"}
        </button>
      </form>

      <p className="muted mt-5 text-center text-sm">
        Already have an account?{" "}
        <Link className="font-semibold text-[#6258e8] hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
