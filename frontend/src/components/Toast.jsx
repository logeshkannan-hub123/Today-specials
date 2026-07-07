import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, type = "success", onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`} role="status">
      <span className="toast-icon" aria-hidden="true">
        {type === "success" ? "✓" : "!"}
      </span>
      <span className="toast-message">{message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
