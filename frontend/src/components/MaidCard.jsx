import React from "react";
import { useNavigate } from "react-router-dom";

function MaidCard({ maid }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/maids/${maid._id}`)}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{maid.user?.name}</h3>
      <p>Work: {maid.workType}</p>
      <p>Experience: {maid.experience} years</p>
      <p>
        Salary: ₹{maid.salaryExpected} ({maid.salaryType})
      </p>
      <p>Availability: {maid.availability}</p>
      <p>City: {maid.location?.city || "N/A"}</p>
      <p>Area: {maid.location?.area || "N/A"}</p>
       <p>
        ⭐ {maid.avgRating?.toFixed(1) || "0"} (
        {maid.numReviews})
      </p>
    </div>
  );
}

export default MaidCard;