import "../styles/App.css";

function Loading() {
  return (
    <div className="state-screen">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="state-message">Loading today's specials...</p>
    </div>
  );
}

export default Loading;
