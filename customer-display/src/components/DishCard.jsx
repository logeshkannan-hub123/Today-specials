import { HOTEL_NAME } from "../utils/constants";
import { toDataUrl, formatPrice } from "../utils/mediaUtils";
import "../styles/DishCard.css";

function DishCard({ dish }) {
  const videoUrl = toDataUrl(dish.video, "video");
  const imageUrl = toDataUrl(dish.image, "image");

  return (
    <div className="dish-card">
      <div className="dish-card-brand">
        <img src="/hotel-logo.svg" alt={`${HOTEL_NAME} logo`} className="dish-card-logo" />
        <span className="dish-card-hotel-name">{HOTEL_NAME}</span>
      </div>

      <div className="dish-card-media">
        {videoUrl ? (
          <video
            className="dish-card-media-el"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : imageUrl ? (
          <img className="dish-card-media-el" src={imageUrl} alt={dish.title} />
        ) : (
          <div className="dish-card-media-fallback">
            <img src="/hotel-logo.svg" alt="" className="dish-card-fallback-logo" />
          </div>
        )}
        <div className="dish-card-media-overlay" />
      </div>

      <div className="dish-card-content">
        <p className="dish-card-eyebrow">Today's Special</p>
        <h1 className="dish-card-title">{dish.title}</h1>
        <h2 className="dish-card-dish-name">{dish.dishName}</h2>
        <p className="dish-card-price">{formatPrice(dish.price)}</p>
      </div>
    </div>
  );
}

export default DishCard;
