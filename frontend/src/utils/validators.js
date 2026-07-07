export function validateLoginForm(values) {
  const errors = {};

  if (!values.username || !values.username.trim()) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateDishForm(values, { hasExistingImage = false, hasExistingVideo = false } = {}) {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = "Title is required";
  }

  if (!values.dishName || !values.dishName.trim()) {
    errors.dishName = "Dish name is required";
  }

  if (values.price === "" || values.price === null || values.price === undefined) {
    errors.price = "Price is required";
  } else if (Number.isNaN(Number(values.price)) || Number(values.price) <= 0) {
    errors.price = "Price must be greater than zero";
  }

  const hasImage = Boolean(values.imageFile) || hasExistingImage;
  const hasVideo = Boolean(values.videoFile) || hasExistingVideo;

  if (!hasImage && !hasVideo) {
    errors.media = "Please upload at least an image or a video";
  }

  return errors;
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
