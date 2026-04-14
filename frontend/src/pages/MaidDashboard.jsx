import { useState, useEffect } from "react";
import { createMaidProfile } from "../services/maidService";
import API from "../services/api";

function MaidDashboard() {
  // 🔹 Profile Form State
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    workType: "",
    experience: "",
    salaryExpected: "",
    salaryType: "",
    availability: "",
    description: "",
  });

  // 🔹 Requests State
  const [requests, setRequests] = useState([]);

  // 🔹 Fetch Requests (for maid)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests/maid");
        setRequests(res.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // 🔹 Handle Profile Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMaidProfile(form);
      alert("Profile created successfully");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔥 PROFILE SECTION */}
      <h2>Create Maid Profile</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>Maid Name</label>
        <input
          placeholder="Enter maid name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Age */}
        <label>Age</label>
        <input
          type="number"
          onChange={(e) =>
            setForm({ ...form, age: Number(e.target.value) })
          }
        />

        {/* Gender */}
        <label>Gender</label>
        <select
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>

        {/* Work Type */}
        <label>Work Type</label>
        <select
          onChange={(e) => setForm({ ...form, workType: e.target.value })}
        >
          <option value="">Select Work Type</option>
          <option value="cleaning">Cleaning</option>
          <option value="cooking">Cooking</option>
          <option value="babysitting">Babysitting</option>
          <option value="all">All</option>
        </select>

        {/* Experience */}
        <label>Experience (years)</label>
        <input
          type="number"
          onChange={(e) =>
            setForm({ ...form, experience: Number(e.target.value) })
          }
        />

        {/* Salary */}
        <label>Expected Salary</label>
        <input
          type="number"
          onChange={(e) =>
            setForm({ ...form, salaryExpected: Number(e.target.value) })
          }
        />

        {/* Salary Type */}
        <label>Salary Type</label>
        <select
          onChange={(e) => setForm({ ...form, salaryType: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
          <option value="hourly">Hourly</option>
        </select>

        {/* Availability */}
        <label>Availability</label>
        <select
          value={form.availability}
          onChange={(e) =>
            setForm({ ...form, availability: e.target.value })
          }
        >
          <option value="">Select Availability</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="hourly">Hourly</option>
        </select>

        {/* Description */}
        <label>Description</label>
        <textarea
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Create Profile</button>
      </form>

      {/* 🔥 REQUEST SECTION */}
      <hr />

      <h2>Incoming Requests</h2>

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
            <p><strong>User:</strong> {req.user?.name}</p>
            <p><strong>Email:</strong> {req.user?.email}</p>
            <p><strong>Status:</strong> {req.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MaidDashboard;