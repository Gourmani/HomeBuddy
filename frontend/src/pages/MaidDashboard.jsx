import { useState, useEffect } from "react";
import { createMaidProfile, updateMaidProfile } from "../services/maidService";
import API from "../services/api";

function MaidDashboard() {
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
    phone: "",
    location: {
      city: "",
      area: "",
    },
  });

  const [profileExists, setProfileExists] = useState(false);
  const [requests, setRequests] = useState([]);

  // 🔥 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/maids/my-profile");

      if (res.data) {
        setProfileExists(true);

        // 🔥 pre-fill form
        setForm(res.data);
      }
    } catch {
      setProfileExists(false);
    }
  };

  // 🔥 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/maid");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profileExists) {
      fetchRequests();
    }
  }, [profileExists]);

  // 🔥 SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (profileExists) {
        await updateMaidProfile(form);
        alert("Profile updated successfully");
      } else {
        await createMaidProfile(form);
        alert("Profile created successfully");
        setProfileExists(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // 🔥 ACCEPT / REJECT
  const handleAction = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{profileExists ? "Update Profile" : "Create Profile"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: Number(e.target.value) })
          }
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>

        <select
          value={form.workType}
          onChange={(e) => setForm({ ...form, workType: e.target.value })}
        >
          <option value="">Work Type</option>
          <option value="cleaning">Cleaning</option>
          <option value="baby-sitting">baby-sitting</option>
          <option value="cooking">Cooking</option>
          <option value="all">All</option>
        </select>

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* 🔥 LOCATION */}
        <input
          placeholder="City"
          value={form.location?.city}
          onChange={(e) =>
            setForm({
              ...form,
              location: { ...form.location, city: e.target.value },
            })
          }
        />

        <input
          placeholder="Area/Locality"
          value={form.location?.area}
          onChange={(e) =>
            setForm({
              ...form,
              location: { ...form.location, area: e.target.value },
            })
          }
        />

        <input
          type="number"
          placeholder="Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: Number(e.target.value) })
          }
        />

        <input
          type="number"
          placeholder="Salary"
          value={form.salaryExpected}
          onChange={(e) =>
            setForm({
              ...form,
              salaryExpected: Number(e.target.value),
            })
          }
        />

        <select
          value={form.salaryType}
          onChange={(e) =>
            setForm({ ...form, salaryType: e.target.value })
          }
        >
          <option value="">Salary Type</option>
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
          <option value="hourly">Hourly</option>
        </select>

        <select
          value={form.availability}
          onChange={(e) =>
            setForm({ ...form, availability: e.target.value })
          }
        >
          <option value="">Availability</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">
          {profileExists ? "Update Profile" : "Create Profile"}
        </button>
      </form>

      {/* 🔥 REQUESTS */}
      {profileExists && (
        <>
          <hr />
          <h2>Incoming Requests</h2>

          {requests.map((req) => (
            <div key={req._id}>
              <p>{req.user?.name}</p>
              <p>{req.user?.email}</p>
              <p>{req.status}</p>

              {req.status === "pending" && (
                <>
                  <button onClick={() => handleAction(req._id, "accepted")}>
                    Accept
                  </button>
                  <button onClick={() => handleAction(req._id, "rejected")}>
                    Reject
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MaidDashboard;