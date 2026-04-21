import React, { useEffect, useState } from "react";
import API from "../services/api";

const cityAreas = {
  Darbhanga: [
    "Laheriasarai",
    "Kadirabad",
    "Benta",
    "Allalpatti",
    "Donar",
    "Darbhanga Tower",
    "Mabbi",
    "Dilli More",
    "LaxmiSagar",
    "Mishratola",
    "Professor Colony",
    "Bela",
    "Darbhanga Tower",
    "Mirzapur",
    "Maulaganj",
    "Rahamganj",
  ],
  Patna: [
    "Boring Road",
    "Kankarbagh",
    "Rajendra Nagar",
    "Patliputra",
    "Danapur",
    "Bailey Road",
    "Ashok Rajpath",
    "Gola Road",
    "Fraser Road",
    "Phulwari Sharif",
    "Ashok Nagar",
    "S K Puri",
    "Kumhrar",
    "Digha",
  ],
};

function MaidDashboard() {
  const [requests, setRequests] = useState([]);
  const [userNeeds, setUserNeeds] = useState([]);

  // 🔥 PROFILE STATE
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    workType: "",
    phone: "",
    experience: "",
    salaryExpected: "",
    salaryType: "",
    availability: "",
    location: { city: "", area: "" },
    description: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔹 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/maid");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 FETCH USER NEEDS
  const fetchUserNeeds = async () => {
    try {
      const res = await API.get("/user-profile");
      setUserNeeds(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/maids/my-profile");
      setProfile(res.data);
    } catch {
      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUserNeeds();
    fetchProfile();
  }, []);

  // 🔹 CREATE PROFILE
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/maids", form);

      alert("Profile created!");

      fetchProfile(); // 🔥 refresh
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UPDATE REQUEST STATUS
  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });
      alert(`Request ${status}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingProfile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maid Dashboard</h2>

      {/* 🔥 SHOW FORM ONLY IF PROFILE NOT EXISTS */}
      {!profile && (
        <div>
          <h3>Create Your Profile</h3>

          <form onSubmit={handleProfileSubmit}>

            <input placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <input type="number" placeholder="Age"
              onChange={(e) => setForm({ ...form, age: e.target.value })} />

            <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select onChange={(e) => setForm({ ...form, workType: e.target.value })}>
              <option value="">Work Type</option>
              <option value="cleaning">Cleaning</option>
              <option value="cooking">Cooking</option>
              <option value="babysitting">Babysitting</option>
              <option value="eldercare">Elder Care</option>
              <option value="driver">Driver</option>
              <option value="eventhelper">Event Helper</option>
            </select>

            <input placeholder="Phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />

            <input type="number" placeholder="Experience"
              onChange={(e) => setForm({ ...form, experience: e.target.value })} />

            <input type="number" placeholder="Salary"
              onChange={(e) => setForm({ ...form, salaryExpected: e.target.value })} />

            <select onChange={(e) => setForm({ ...form, salaryType: e.target.value })}>
              <option value="">Salary Type</option>
              <option value="monthly">Monthly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>

            <select onChange={(e) => setForm({ ...form, availability: e.target.value })}>
              <option value="">Availability</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </select>

            {/* CITY */}
            <select
              onChange={(e) =>
                setForm({
                  ...form,
                  location: { city: e.target.value, area: "" },
                })
              }
            >
              <option value="">City</option>
              {Object.keys(cityAreas).map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>

            {/* AREA */}
            <select
              onChange={(e) =>
                setForm({
                  ...form,
                  location: {
                    ...form.location,
                    area: e.target.value,
                  },
                })
              }
              disabled={!form.location.city}
            >
              <option value="">Area</option>
              {form.location.city &&
                cityAreas[form.location.city].map((area) => (
                  <option key={area}>{area}</option>
                ))}
            </select>

            <textarea
              placeholder="Description"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <button>
              {loading ? "Saving..." : "Create Profile"}
            </button>
          </form>
        </div>
      )}

      {/* ================= REQUESTS ================= */}
      <h3>Incoming Requests</h3>

      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <p><strong>User:</strong> {req.user?.name}</p>
            <p><strong>Email:</strong> {req.user?.email}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === "pending" && (
              <>
                <button onClick={() => handleStatusUpdate(req._id, "accepted")}>Accept</button>
                <button onClick={() => handleStatusUpdate(req._id, "rejected")}>Reject</button>
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
          <div key={u._id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
            <h4>{u.user?.name}</h4>
            <p>📍 {u.location?.area}, {u.location?.city}</p>
            <p>💼 {u.workRequired}</p>
            <p>💰 ₹{u.budget}</p>
            <p>📞 {u.phone}</p>
            <p>📧 {u.user?.email}</p>
            <p>{u.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MaidDashboard;