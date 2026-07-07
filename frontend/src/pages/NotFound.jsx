import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import "./NotFound.css";

function NotFound() {
  const homeLink = isAuthenticated() ? "/" : "/login";

  return (
    <div className="not-found-page">
      <div className="not-found-card card">
        <h1 className="not-found-code">404</h1>
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to={homeLink} className="btn btn-primary">
          Back to {isAuthenticated() ? "Dashboard" : "Login"}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
