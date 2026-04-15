import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function MaidDetails() {
  const { id } = useParams();

  const [maid, setMaid] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW STATE
  const [requestStatus, setRequestStatus] = useState(null);

  // 🔹 FETCH MAID + REQUEST STATUS
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch maid
        const maidRes = await API.get(`/maids/${id}`);
        setMaid(maidRes.data.data);

        // 2️⃣ Fetch request status
        const statusRes = await API.get(`/requests/status/${id}`);
        setRequestStatus(statusRes.data.status);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔹 SEND REQUEST
  const handleRequest = async () => {
    try {
      await API.post("/requests", {
        maidId: maid._id,
      });

      alert("Request sent successfully!");

      // 🔥 update UI immediately
      setRequestStatus("pending");

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

      {/* 🔥 CONDITIONAL UI */}
      <hr />

      {requestStatus === "accepted" ? (
        <div>
          <h3>Contact Available</h3>
          <p><strong>Email:</strong> {maid.user?.email}</p>
          <p><strong>Phone:</strong> {maid.phone}</p>
        </div>

      ) : requestStatus === "pending" ? (
        <p>Request Pending...</p>

      ) : (
        <button onClick={handleRequest}>
          Request Contact
        </button>
      )}
    </div>
  );
}

export default MaidDetails;