import "../styles/App.css";

function ErrorState({ onRetry }) {
  return (
    <div className="state-screen">
      <p className="state-message state-message-error">Unable to load today's specials.</p>
      <button type="button" className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
