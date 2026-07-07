import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { register } from "../services/authService";
import { validateLoginForm, isFormValid } from "../utils/validators";
import { getErrorMessage } from "../utils/format";
import { HOTEL_NAME } from "../utils/constants";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError("");
    setSuccessMessage("");

    const validationErrors = validateLoginForm({ username, password });
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await register(username.trim(), password);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (error) {
      setApiError(getErrorMessage(error, "Username already exists."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card card">
        <div className="register-brand">
          <img src="/hotel-logo.svg" alt={`${HOTEL_NAME} logo`} className="register-logo" />
          <h1 className="register-hotel-name">{HOTEL_NAME}</h1>
          <p className="register-subtitle">Create a new admin account</p>
        </div>

        {apiError ? <div className="alert alert-error">{apiError}</div> : null}
        {successMessage ? <div className="alert alert-success">{successMessage}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="register-username">
              Username
            </label>
            <input
              id="register-username"
              type="text"
              className={`form-input${errors.username ? " has-error" : ""}`}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              autoComplete="username"
            />
            {errors.username ? <p className="form-error">{errors.username}</p> : null}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className={`form-input${errors.password ? " has-error" : ""}`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Choose a password"
              autoComplete="new-password"
            />
            {errors.password ? <p className="form-error">{errors.password}</p> : null}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <Link to="/login" className="btn btn-secondary btn-block register-back-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
