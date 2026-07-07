import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DishForm from "../components/DishForm";
import Loader from "../components/Loader";
import { getDishById, updateDish } from "../services/dishService";
import { getErrorMessage } from "../utils/format";
import "./EditDish.css";

function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDish() {
      setIsLoading(true);
      setLoadError("");
      try {
        const data = await getDishById(id);
        if (isMounted) {
          setDish(data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setLoadError(getErrorMessage(fetchError, "Dish not found."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDish();

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleSubmit(payload) {
    setApiError("");
    setIsSubmitting(true);
    try {
      await updateDish(id, payload);
      navigate("/manage-dish", {
        replace: true,
        state: { successMessage: "Dish updated successfully" },
      });
    } catch (error) {
      setApiError(getErrorMessage(error, "Failed to update the dish. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <Loader label="Loading dish..." fullPage />;
  }

  if (loadError || !dish) {
    return (
      <div className="state-block">
        <span className="state-icon" aria-hidden="true">
          ⚠️
        </span>
        <h3>Unable to load dish</h3>
        <p>{loadError || "Dish not found."}</p>
        <Link to="/manage-dish" className="btn btn-secondary">
          Back to Manage Dish
        </Link>
      </div>
    );
  }

  const initialValues = {
    title: dish.title,
    dishName: dish.dishName,
    price: dish.price,
    existingImage: dish.image,
    existingVideo: dish.video,
  };

  return (
    <div className="edit-dish-page">
      <h2>Edit Dish</h2>
      <p className="page-subtitle">Update details for &quot;{dish.title}&quot;.</p>

      {apiError ? <div className="alert alert-error">{apiError}</div> : null}

      <DishForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default EditDish;
