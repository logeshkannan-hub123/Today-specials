import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DishForm from "../components/DishForm";
import { createDish } from "../services/dishService";
import { getErrorMessage } from "../utils/format";
import "./AddDish.css";

const EMPTY_DISH = {
  title: "",
  dishName: "",
  price: "",
  existingImage: null,
  existingVideo: null,
};

function AddDish() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(payload) {
    setApiError("");
    setIsSubmitting(true);
    try {
      await createDish(payload);
      navigate("/manage-dish", {
        replace: true,
        state: { successMessage: "Dish added successfully" },
      });
    } catch (error) {
      setApiError(getErrorMessage(error, "Failed to save the dish. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="add-dish-page">
      <h2>Add Dish</h2>
      <p className="page-subtitle">Create a new today's special for the menu.</p>

      {apiError ? <div className="alert alert-error">{apiError}</div> : null}

      <DishForm
        mode="add"
        initialValues={EMPTY_DISH}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default AddDish;
