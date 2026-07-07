import { Link } from "react-router-dom";
import { formatPrice, formatDate } from "../utils/format";
import { toDataUrl } from "../utils/fileHelpers";
import "./DishCard.css";

function DishCard({ dish, onToggleActive, onDelete, isBusy }) {
  const imageUrl = toDataUrl(dish.image, "image");
  const videoUrl = toDataUrl(dish.video, "video");

  return (
    <div className="dish-card card">
      <div className="dish-card-media">
        {imageUrl ? <img src={imageUrl} alt={dish.title} className="dish-card-image" /> : null}
        {videoUrl ? (
          <video src={videoUrl} controls className="dish-card-video">
            <track kind="captions" />
          </video>
        ) : null}
        {!imageUrl && !videoUrl ? (
          <div className="dish-card-media-placeholder">No media</div>
        ) : null}
      </div>

      <div className="dish-card-body">
        <div className="dish-card-header">
          <h3 className="dish-card-title">{dish.title}</h3>
          <span className={`badge ${dish.isActive ? "badge-active" : "badge-inactive"}`}>
            {dish.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="dish-card-name">{dish.dishName}</p>
        <p className="dish-card-price">{formatPrice(dish.price)}</p>
        <p className="dish-card-date">Added {formatDate(dish.createdAt)}</p>

        <div className="dish-card-actions">
          <label className="dish-card-toggle">
            <input
              type="checkbox"
              checked={dish.isActive}
              onChange={() => onToggleActive(dish)}
              disabled={isBusy}
            />
            <span>{dish.isActive ? "Active" : "Inactive"}</span>
          </label>

          <div className="dish-card-buttons">
            <Link to={`/edit-dish/${dish.id}`} className="btn btn-secondary btn-sm">
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(dish)}
              disabled={isBusy}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
