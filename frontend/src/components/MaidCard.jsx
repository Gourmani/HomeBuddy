import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/maidCard.css";

function MaidCard({ maid }) {
  const navigate = useNavigate();

  return (
    <div
      className="maid-card"
      onClick={() => navigate(`/maids/${maid._id}`)}
    >

      {/* HEADER */}
      <div className="maid-card-header">
        <div>
          <h3>{maid.user?.name}</h3>
          <span className="verified-badge">✔ Verified</span>
        </div>

        <div className="rating">
          ⭐ {maid.avgRating?.toFixed(1) || "0"}
          <span> ({maid.numReviews || 0})</span>
        </div>
      </div>

      {/* WORK TYPE */}
      <div className="work-chip">
        {maid.workType}
      </div>

      {/* DETAILS */}
      <div className="maid-details">
        <p><strong>{maid.experience} yrs</strong> experience</p>
        <p>₹{maid.salaryExpected} / {maid.salaryType}</p>
        <p>{maid.availability}</p>
      </div>

      {/* LOCATION */}
      <div className="maid-location">
        📍 {maid.location?.area || "N/A"}, {maid.location?.city || "N/A"}
      </div>

      {/* CTA */}
      <button
        className="view-btn"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/maids/${maid._id}`);
        }}
      >
        View Profile
      </button>

    </div>
  );
}

export default MaidCard;