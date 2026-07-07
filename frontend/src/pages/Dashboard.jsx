import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDishes } from "../services/dishService";
import { getErrorMessage } from "../utils/format";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDishes() {
      setIsLoading(true);
      setError("");
      try {
        const data = await getAllDishes();
        if (isMounted) {
          setDishes(data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(getErrorMessage(fetchError, "Unable to load dashboard stats."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDishes();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalDishes = dishes.length;
  const activeDishes = dishes.filter((dish) => dish.isActive).length;
  const inactiveDishes = totalDishes - activeDishes;

  return (
    <div className="dashboard-page">
      <h2>Welcome{user?.username ? `, ${user.username}` : ""}</h2>
      <p className="dashboard-subtitle">Here's a quick overview of today's specials.</p>

      {error ? <div className="alert alert-error">{error}</div> : null}

      {isLoading ? (
        <Loader label="Loading dashboard..." />
      ) : (
        <div className="grid dashboard-stats">
          <div className="card dashboard-stat">
            <span className="dashboard-stat-value">{totalDishes}</span>
            <span className="dashboard-stat-label">Total Dishes</span>
          </div>
          <div className="card dashboard-stat">
            <span className="dashboard-stat-value">{activeDishes}</span>
            <span className="dashboard-stat-label">Active</span>
          </div>
          <div className="card dashboard-stat">
            <span className="dashboard-stat-value">{inactiveDishes}</span>
            <span className="dashboard-stat-label">Inactive</span>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <Link to="/add-dish" className="btn btn-primary">
          Add Dish
        </Link>
        <Link to="/manage-dish" className="btn btn-secondary">
          Manage Dish
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
