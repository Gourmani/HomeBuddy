import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function MaidDetails() {
  const { id } = useParams();
  const [maid, setMaid] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH MAID
  useEffect(() => {
    const fetchMaid = async () => {
      try {
        const res = await API.get(`/maids/${id}`);
        setMaid(res.data.data);
      } catch (error) {
        console.error("Error fetching maid:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaid();
  }, [id]);

  // ✅ REQUEST FUNCTION (MOVED OUTSIDE)
  const handleRequest = async () => {
    try {
      await API.post("/requests", {
        maidId: maid._id,
      });

      alert("Request sent successfully!");
    } catch (error) {
      console.error("Request error:", error);
      alert("Failed to send request");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!maid) return <p>Maid not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{maid.user?.name}</h2>

      <p><strong>Work:</strong> {maid.workType}</p>
      <p><strong>Experience:</strong> {maid.experience} years</p>
      <p><strong>Salary:</strong> ₹{maid.salaryExpected} ({maid.salaryType})</p>
      <p><strong>Availability:</strong> {maid.availability}</p>
      <p><strong>City:</strong> {maid.location?.city || "N/A"}</p>
      <p><strong>Area:</strong> {maid.location?.area || "N/A"}</p>

      <p><strong>Description:</strong></p>
      <p>{maid.description}</p>

      {/* 🔥 REQUEST BUTTON */}
      <button onClick={handleRequest}>
        Request Contact
      </button>
    </div>
  );
}

export default MaidDetails;