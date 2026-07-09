import { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { SLIDE_DURATION_MS } from "../utils/constants";
import "../styles/Carousel.css";

function DishCarousel({ dishes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= dishes.length) {
      setCurrentIndex(0);
    }
  }, [dishes.length, currentIndex]);

  useEffect(() => {
    if (dishes.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dishes.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [dishes.length]);

  const currentDish = dishes[currentIndex];

  if (!currentDish) {
    return null;
  }

  return (
    <div className="carousel">
      <div className="carousel-slide" key={currentDish.id}>
        <DishCard dish={currentDish} />
      </div>

      {dishes.length > 1 ? (
        <div className="carousel-indicators">
          {dishes.map((dish, index) => (
            <span
              key={dish.id}
              className={`carousel-dot${index === currentIndex ? " carousel-dot-active" : ""}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default DishCarousel;
