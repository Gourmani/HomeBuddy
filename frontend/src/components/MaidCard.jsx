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

      {/*  IMAGE SECTION (NEW) */}
      <div className="maid-image">
        <img
          src={
            maid.profileImage ||
            "/images/mci.jpg" // fallback (add later)
          }
          alt="maid"
        />
      </div>

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

      {/* MATCH BADGE */}
      {maid.matchScore !== undefined && (
        <div style={{ marginBottom: "5px" }}>
          {maid.matchScore >= 2 && (
            <span style={{ color: "green", fontWeight: "bold" }}>
              ⭐ Best Match
            </span>
          )}

          {maid.matchScore === 1 && (
            <span style={{ color: "orange" }}>
              👍 Match
            </span>
          )}
        </div>
      )}

      {/* WORK TYPE */}
      <div className="work-chip">
        {Array.isArray(maid.workType)
          ? maid.workType.join(", ")
          : maid.workType}
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