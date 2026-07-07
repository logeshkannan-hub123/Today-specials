import "./Loader.css";

function Loader({ label = "Loading...", fullPage = false }) {
  return (
    <div className={fullPage ? "loader loader-full-page" : "loader"}>
      <span className="loader-spinner" aria-hidden="true" />
      {label ? <span className="loader-label">{label}</span> : null}
    </div>
  );
}

export default Loader;
