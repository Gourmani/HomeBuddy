import React, { useEffect, useState } from "react";
import API from "../services/api";

function MaidDashboard() {
  const [requests, setRequests] = useState([]);
  const [userNeeds, setUserNeeds] = useState([]); // 🔥 NEW

  // 🔹 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/maid");
      setRequests(res.data.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // 🔹 FETCH USER REQUIREMENTS
  const fetchUserNeeds = async () => {
    try {
      const res = await API.get("/user-profile");
      setUserNeeds(res.data.data);
    } catch (error) {
      console.error("Error fetching user needs:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUserNeeds(); // 🔥 NEW CALL
  }, []);

  // 🔹 UPDATE STATUS
  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });

      alert(`Request ${status}`);

      fetchRequests(); // refresh
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maid Dashboard</h2>

      {/* ================= REQUESTS ================= */}
      <h3>Incoming Requests</h3>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><strong>User:</strong> {req.user?.name}</p>
            <p><strong>Email:</strong> {req.user?.email}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === "pending" && (
              <>
                <button
                  onClick={() => handleStatusUpdate(req._id, "accepted")}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatusUpdate(req._id, "rejected")}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))
      )}

      {/* ================= USER NEEDS ================= */}
      <hr />

      <h3>Users Looking for Work</h3>

      {userNeeds.length === 0 ? (
        <p>No users yet</p>
      ) : (
        userNeeds.map((u) => (
          <div
            key={u._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              background: "#f9f9f9",
            }}
          >
            <h4>{u.user?.name}</h4>

            <p>📍 {u.location?.area}, {u.location?.city}</p>
            <p>💼 {u.workRequired}</p>
            <p>💰 Budget: ₹{u.budget}</p>
            <p>{u.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MaidDashboard;