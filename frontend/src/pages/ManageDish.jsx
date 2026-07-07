import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DishCard from "../components/DishCard";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { deleteDish, getAllDishes, toggleDishActive } from "../services/dishService";
import { getErrorMessage } from "../utils/format";
import "./ManageDish.css";

function ManageDish() {
  const location = useLocation();

  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(() =>
    location.state?.successMessage
      ? { message: location.state.successMessage, type: "success" }
      : null
  );
  const [busyIds, setBusyIds] = useState(() => new Set());

  useEffect(() => {
    loadDishes();
  }, []);

  async function loadDishes() {
    setIsLoading(true);
    setError("");
    try {
      const data = await getAllDishes();
      setDishes(data);
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, "Unable to load dishes."));
    } finally {
      setIsLoading(false);
    }
  }

  function setBusy(id, isBusy) {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (isBusy) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  async function handleToggleActive(dish) {
    const nextActive = !dish.isActive;

    setBusy(dish.id, true);
    setDishes((prev) => prev.map((item) => (item.id === dish.id ? { ...item, isActive: nextActive } : item)));

    try {
      await toggleDishActive(dish.id, nextActive);
    } catch (toggleError) {
      setDishes((prev) =>
        prev.map((item) => (item.id === dish.id ? { ...item, isActive: dish.isActive } : item))
      );
      setToast({ message: getErrorMessage(toggleError, "Failed to update status."), type: "error" });
    } finally {
      setBusy(dish.id, false);
    }
  }

  async function handleDelete(dish) {
    const confirmed = window.confirm(`Delete "${dish.title}"? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setBusy(dish.id, true);
    try {
      await deleteDish(dish.id);
      setDishes((prev) => prev.filter((item) => item.id !== dish.id));
      setToast({ message: "Dish deleted successfully", type: "success" });
    } catch (deleteError) {
      setToast({ message: getErrorMessage(deleteError, "Failed to delete dish."), type: "error" });
    } finally {
      setBusy(dish.id, false);
    }
  }

  return (
    <div className="manage-dish-page">
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="manage-dish-header">
        <div>
          <h2>Manage Dish</h2>
          <p className="page-subtitle">View, edit, and manage today's specials.</p>
        </div>
        <Link to="/add-dish" className="btn btn-primary">
          Add Dish
        </Link>
      </div>

      {error ? <div className="alert alert-error">{error}</div> : null}

      {isLoading ? (
        <Loader label="Loading dishes..." fullPage />
      ) : dishes.length === 0 ? (
        <div className="state-block">
          <span className="state-icon" aria-hidden="true">
            🍽️
          </span>
          <h3>No dishes yet</h3>
          <p>Add your first today's special to get started.</p>
          <Link to="/add-dish" className="btn btn-primary">
            Add Dish
          </Link>
        </div>
      ) : (
        <div className="grid manage-dish-grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
              isBusy={busyIds.has(dish.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageDish;
