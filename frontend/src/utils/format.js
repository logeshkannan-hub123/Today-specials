export function formatPrice(price) {
  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return "-";
  }
  return `Rs. ${numericPrice.toFixed(2)}`;
}

export function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  return error?.response?.data?.message || error?.message || fallback;
}
