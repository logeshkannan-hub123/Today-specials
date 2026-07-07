import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateDishForm, isFormValid } from "../utils/validators";
import { fileToBase64, toDataUrl } from "../utils/fileHelpers";
import "./DishForm.css";

function DishForm({ mode, initialValues, onSubmit, isSubmitting }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialValues.title || "");
  const [dishName, setDishName] = useState(initialValues.dishName || "");
  const [price, setPrice] = useState(initialValues.price ?? "");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(() =>
    toDataUrl(initialValues.existingImage, "image")
  );
  const [videoPreview, setVideoPreview] = useState(() =>
    toDataUrl(initialValues.existingVideo, "video")
  );
  const [errors, setErrors] = useState({});

  const imagePreviewRef = useRef(imagePreview);
  const videoPreviewRef = useRef(videoPreview);
  imagePreviewRef.current = imagePreview;
  videoPreviewRef.current = videoPreview;

  useEffect(
    () => () => {
      if (imagePreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      if (videoPreviewRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreviewRef.current);
      }
    },
    []
  );

  function handleImageChange(event) {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview((prev) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return file ? URL.createObjectURL(file) : toDataUrl(initialValues.existingImage, "image");
    });
  }

  function handleVideoChange(event) {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
    setVideoPreview((prev) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return file ? URL.createObjectURL(file) : toDataUrl(initialValues.existingVideo, "video");
    });
  }

  function handleReset() {
    setTitle(initialValues.title || "");
    setDishName(initialValues.dishName || "");
    setPrice(initialValues.price ?? "");
    setImageFile(null);
    setVideoFile(null);
    setImagePreview(toDataUrl(initialValues.existingImage, "image"));
    setVideoPreview(toDataUrl(initialValues.existingVideo, "video"));
    setErrors({});
  }

  function handleCancel() {
    navigate("/manage-dish");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const values = { title, dishName, price, imageFile, videoFile };
    const validationErrors = validateDishForm(values, {
      hasExistingImage: Boolean(initialValues.existingImage),
      hasExistingVideo: Boolean(initialValues.existingVideo),
    });

    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      return;
    }

    const payload = {
      title: title.trim(),
      dishName: dishName.trim(),
      price: Number(price),
    };

    if (mode === "add") {
      payload.isActive = true;
    }

    if (imageFile) {
      payload.image = await fileToBase64(imageFile);
    }

    if (videoFile) {
      payload.video = await fileToBase64(videoFile);
    }

    await onSubmit(payload);
  }

  return (
    <form className="dish-form card" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="dish-title">
          Title *
        </label>
        <input
          id="dish-title"
          type="text"
          className={`form-input${errors.title ? " has-error" : ""}`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Chef's Special"
        />
        {errors.title ? <p className="form-error">{errors.title}</p> : null}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dish-name">
          Dish Name *
        </label>
        <input
          id="dish-name"
          type="text"
          className={`form-input${errors.dishName ? " has-error" : ""}`}
          value={dishName}
          onChange={(event) => setDishName(event.target.value)}
          placeholder="e.g. Butter Chicken"
        />
        {errors.dishName ? <p className="form-error">{errors.dishName}</p> : null}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dish-price">
          Price *
        </label>
        <input
          id="dish-price"
          type="number"
          min="0"
          step="0.01"
          className={`form-input${errors.price ? " has-error" : ""}`}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="e.g. 249.99"
        />
        {errors.price ? <p className="form-error">{errors.price}</p> : null}
      </div>

      <div className="dish-form-media-row">
        <div className="form-group">
          <label className="form-label" htmlFor="dish-image">
            Image Upload
          </label>
          <input
            id="dish-image"
            type="file"
            accept="image/*"
            className="form-input"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Dish preview" className="dish-form-preview-image" />
          ) : null}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="dish-video">
            Video Upload
          </label>
          <input
            id="dish-video"
            type="file"
            accept="video/*"
            className="form-input"
            onChange={handleVideoChange}
          />
          {videoPreview ? (
            <video src={videoPreview} controls className="dish-form-preview-video">
              <track kind="captions" />
            </video>
          ) : null}
        </div>
      </div>

      {errors.media ? <p className="form-error dish-form-media-error">{errors.media}</p> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        {mode === "add" ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default DishForm;
