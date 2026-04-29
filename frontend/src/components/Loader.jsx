import React from "react";
import "../styles/loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Finding best workers for you...</p>
    </div>
  );
}

export default Loader;