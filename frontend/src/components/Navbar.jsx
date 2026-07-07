import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { HOTEL_NAME } from "../utils/constants";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <img src="/hotel-logo.svg" alt="" className="navbar-logo" />
          <span className="navbar-title">{HOTEL_NAME}</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink
            to="/add-dish"
            className={({ isActive }) => `navbar-link${isActive ? " navbar-link-active" : ""}`}
          >
            Add Dish
          </NavLink>
          <NavLink
            to="/manage-dish"
            className={({ isActive }) => `navbar-link${isActive ? " navbar-link-active" : ""}`}
          >
            Manage Dish
          </NavLink>
          <button type="button" className="btn btn-secondary navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
