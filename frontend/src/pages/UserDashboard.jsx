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
    "Delhi More",
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
  ],
};

function UserDashboard() {
  const [requests, setRequests] = useState([]);

  // 🔥 USER PROFILE STATE
  const [profile, setProfile] = useState({
    phone: "",
    location: { city: "", area: "" },
    workRequired: "",
    budget: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

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
      console.log("No profile yet");
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

      await API.post("/user-profile", profile);

      alert("Profile saved successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">

      {/* 🔥 USER PROFILE */}
      <div className="profile-card">
        <h2>User Profile</h2>

        <form onSubmit={handleProfileSubmit} className="form-grid">

          {/* PHONE */}
          <input
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />

          {/* 🔥 CITY DROPDOWN */}
          <select
            value={profile.location?.city || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: {
                  city: e.target.value,
                  area: "", // reset area
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

          {/* 🔥 AREA DROPDOWN */}
          <select
            value={profile.location?.area || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: {
                  ...profile.location,
                  area: e.target.value,
                },
              })
            }
            disabled={!profile.location?.city}
          >
            <option value="">Select Area</option>
            {profile.location?.city &&
              cityAreas[profile.location.city].map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
          </select>

          {/* WORK REQUIRED */}
          <select
            value={profile.workRequired}
            onChange={(e) =>
              setProfile({ ...profile, workRequired: e.target.value })
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

          {/* BUDGET */}
          <input
            type="number"
            placeholder="Budget"
            value={profile.budget}
            onChange={(e) =>
              setProfile({
                ...profile,
                budget: Number(e.target.value),
              })
            }
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={profile.description}
            onChange={(e) =>
              setProfile({
                ...profile,
                description: e.target.value,
              })
            }
          />

          <button className="btn primary">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* 🔥 REQUEST SECTION */}
      <h2 className="dashboard-title">My Requests</h2>

      {requests.length === 0 ? (
        <p className="empty-text">No requests yet</p>
      ) : (
        <div className="request-grid">
          {requests.map((req) => (
            <div key={req._id} className="request-card">

              {/* HEADER */}
              <div className="request-header">
                <h3>{req.maid?.user?.name}</h3>
                <span className={`status ${req.status}`}>
                  {req.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="request-body">
                <p>
                  📍 {req.maid?.location?.area},{" "}
                  {req.maid?.location?.city}
                </p>

                <p>💼 {req.maid?.workType}</p>
              </div>

              {/* CONTACT */}
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