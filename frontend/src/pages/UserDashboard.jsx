import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/userDashboard.css";

// 🔥 SAME DATA AS MAID DASHBOARD
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

function UserDashboard() {
  const [requests, setRequests] = useState([]);

  // 🔥 PROFILE STATE
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    location: { city: "", area: "" },
    workRequired: "",
    budget: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // 🔹 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/user");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/user-profile/me");

      if (res.data) {
        setProfile(res.data);
      }
    } catch {
      setProfile(null); // no profile
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchProfile();
  }, []);

  // 🔹 SAVE PROFILE
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/user-profile", form);

      alert("Profile saved successfully!");

      // 🔥 refresh profile → hide form
      fetchProfile();

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">

      {/* 🔥 SHOW FORM ONLY IF PROFILE NOT EXISTS */}
      {!profile && (
        <div className="profile-card">
          <h2>Create Your Profile</h2>

          <form onSubmit={handleProfileSubmit} className="form-grid">

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {/* CITY */}
            <select
              value={form.location.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: {
                    city: e.target.value,
                    area: "",
                  },
                })
              }
            >
              <option value="">Select City</option>
              {Object.keys(cityAreas).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* AREA */}
            <select
              value={form.location.area}
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
              <option value="">Select Area</option>
              {form.location.city &&
                cityAreas[form.location.city].map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>

            {/* WORK */}
            <select
              value={form.workRequired}
              onChange={(e) =>
                setForm({ ...form, workRequired: e.target.value })
              }
            >
              <option value="">Work Required</option>
              <option value="cleaning">Cleaning</option>
              <option value="cooking">Cooking</option>
              <option value="babysitting">Babysitting</option>
              <option value="eldercare">Elder Care</option>
              <option value="driver">Driver</option>
              <option value="eventhelper">Event Helper</option>
            </select>

            <input
              type="number"
              placeholder="Budget"
              value={form.budget}
              onChange={(e) =>
                setForm({ ...form, budget: Number(e.target.value) })
              }
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button className="btn primary">
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      )}

      {/* 🔥 REQUEST SECTION ALWAYS VISIBLE */}
      <h2 className="dashboard-title">My Requests</h2>

      {requests.length === 0 ? (
        <p className="empty-text">No requests yet</p>
      ) : (
        <div className="request-grid">
          {requests.map((req) => (
            <div key={req._id} className="request-card">

              <div className="request-header">
                <h3>{req.maid?.user?.name}</h3>
                <span className={`status ${req.status}`}>
                  {req.status}
                </span>
              </div>

              <div className="request-body">
                <p>
                  📍 {req.maid?.location?.area}, {req.maid?.location?.city}
                </p>

                <p>💼 {req.maid?.workType}</p>
              </div>

              {req.status === "accepted" && (
                <div className="contact-box">
                  <p><strong>Email:</strong> {req.maid?.user?.email}</p>
                  <p><strong>Phone:</strong> {req.maid?.phone || "N/A"}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;