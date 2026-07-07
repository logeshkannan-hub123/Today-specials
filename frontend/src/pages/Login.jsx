import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateLoginForm, isFormValid } from "../utils/validators";
import { getErrorMessage } from "../utils/format";
import { HOTEL_NAME } from "../utils/constants";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError("");

    const validationErrors = validateLoginForm({ username, password });
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate("/", { replace: true });
    } catch (error) {
      setApiError(getErrorMessage(error, "Invalid username or password"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-brand">
          <img src="/hotel-logo.svg" alt={`${HOTEL_NAME} logo`} className="login-logo" />
          <h1 className="login-hotel-name">{HOTEL_NAME}</h1>
          <p className="login-subtitle">Today's Specials Management System</p>
        </div>

        {apiError ? <div className="alert alert-error">{apiError}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              className={`form-input${errors.username ? " has-error" : ""}`}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
            {errors.username ? <p className="form-error">{errors.username}</p> : null}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className={`form-input${errors.password ? " has-error" : ""}`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password ? <p className="form-error">{errors.password}</p> : null}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/register" className="btn btn-secondary btn-block login-register-link">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
