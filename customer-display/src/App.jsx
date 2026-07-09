import { useCallback, useEffect, useRef, useState } from "react";
import DishCarousel from "./components/DishCarousel";
import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";
import { getActiveDishes } from "./services/todaySpecialService";
import { REFRESH_INTERVAL_MS } from "./utils/constants";
import "./styles/App.css";

function App() {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");
  const hasLoadedOnceRef = useRef(false);

  const loadDishes = useCallback(async () => {
    try {
      const data = await getActiveDishes();
      setDishes(data);
      setStatus("ready");
      hasLoadedOnceRef.current = true;
    } catch (error) {
      console.error("Failed to load active dishes:", error);
      if (!hasLoadedOnceRef.current) {
        setStatus("error");
      }
    }
  }, []);

  useEffect(() => {
    loadDishes();

    const intervalId = setInterval(loadDishes, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [loadDishes]);

  function handleRetry() {
    setStatus("loading");
    loadDishes();
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <ErrorState onRetry={handleRetry} />;
  }

  if (dishes.length === 0) {
    return <EmptyState />;
  }

  return <DishCarousel dishes={dishes} />;
}

export default App;
