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
      {/* IMAGE SECTION */}
      <div className="maid-image">
        <img
          src={maid.profileImage || "/images/mcard.png"}
          alt="maid"
        />

        {/* RATING BADGE */}
        <div className="rating-badge">
          ⭐ {maid.avgRating?.toFixed(1) || "0"}
          <span className="rating-count">
            ({maid.numReviews || 0})
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="maid-content">

        {/* HEADER */}
        <div className="maid-card-header">
          <div>
            <h3>{maid.user?.name || "Unknown"}</h3>
            <span className="verified-badge">✔ Verified</span>
          </div>
        </div>

        {/* MATCH BADGE */}
        {maid.matchScore !== undefined && (
          <div className="match-container">
            {maid.matchScore >= 2 && (
              <span className="match best">⭐ Best Match</span>
            )}
            {maid.matchScore === 1 && (
              <span className="match good">👍 Good Match</span>
            )}
          </div>
        )}

        {/* WORK TYPE */}
        <div className="work-chip">
          {Array.isArray(maid.workType)
            ? maid.workType.join(", ")
            : maid.workType || "Not specified"}
        </div>

        {/* DETAILS */}
        <div className="maid-details">
          <p><strong>{maid.experience || 0} yrs</strong> experience</p>
          <p>
            ₹{maid.salaryExpected || "N/A"} /{" "}
            {maid.salaryType || "month"}
          </p>
          <p>{maid.availability || "Available"}</p>
        </div>

        {/* LOCATION */}
        <div className="maid-location">
          📍 {maid.location?.area || "N/A"},{" "}
          {maid.location?.city || "N/A"}
        </div>

        {/* CTA */}
        <button
          className="view-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/maids/${maid._id}`);
          }}
        >
          View Profile →
        </button>

      </div>
    </div>
  );
}

export default MaidCard;