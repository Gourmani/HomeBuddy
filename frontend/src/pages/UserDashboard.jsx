import { useEffect, useState } from "react";
import API from "../services/api";

function UserDashboard() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/user");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <p><strong>Maid:</strong> {req.maid?.user?.name}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === "accepted" && (
              <div>
                <p><strong>Email:</strong> {req.maid?.user?.email}</p>
                <p><strong>Phone:</strong> {req.maid?.phone || "N/A"}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserDashboard;