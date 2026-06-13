import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../styles/maidHome.css";

function MaidHome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [userNeeds, setUserNeeds] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchUserNeeds();
    fetchProfile();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests/maid");
      setRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserNeeds = async () => {
    try {
      const res = await API.get("/user-profile");
      setUserNeeds(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/maids/my-profile");
      setProfile(res.data);
    } catch (error) {
      console.error(error);
      setProfile(null);
    }
  };

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (r) => r.status === "pending"
  ).length;

  const acceptedRequests = requests.filter(
    (r) => r.status === "accepted"
  ).length;

  const rejectedRequests = requests.filter(
    (r) => r.status === "rejected"
  ).length;

  return (
    <div className="maid-home">

     <div className="maid-home-hero">

  <div className="hero-left">

    <div className="hero-badge">
      Trusted Worker Dashboard
    </div>

    <h1>
      Welcome back, {user?.name || "Partner"} 👋
    </h1>

    <p>
      Discover new opportunities, manage requests,
      and grow your profile visibility.
    </p>

    <div className="hero-actions">

      <button
        className="btn primary"
        onClick={() => navigate("/maid-dashboard")}
      >
        Manage Requests
      </button>

      <button
        className="btn secondary"
        onClick={() => navigate("/maid-profile")}
      >
        View Profile
      </button>

    </div>

  </div>

 <div className="hero-avatar">
  <img
    src={profile?.profileImage || "/images/mci.jpg"}
    alt="Profile"
    className="hero-profile-image"
  />
</div>

</div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>{totalRequests}</h3>
          <p>Total Requests</p>
        </div>

        <div className="stat-card">
          <h3>{pendingRequests}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>{acceptedRequests}</h3>
          <p>Accepted</p>
        </div>

        <div className="stat-card">
          <h3>{rejectedRequests}</h3>
          <p>Rejected</p>
        </div>

      </div>
           
         <div className="section-card">

  <div className="section-header">
    <h2>HomeBuddy Kaise Kaam Karta Hai?</h2>
  </div>

  <div className="about-homebuddy">

    <p>
     HomeBuddy par apna profile banaiye.
  Families aapko direct kaam ke requests bhejengi.

  Request accept kijiye, family se contact kijiye
  aur aasani se kaam paaiye.

  Koi jhanjhat nahi, seedha contact aur seedha kaam.
    </p>

    <div className="about-points">

      <div className="about-item">
        ✅ Apna profile banaiye
      </div>

      <div className="about-item">
        ✅ Families se direct requests paaiye
      </div>

      <div className="about-item">
        ✅ Apni pasand ka kaam chuniye
      </div>

      <div className="about-item">
        ✅ Zyada kaam aur zyada opportunities paaiye
      </div>

    </div>

  </div>

</div>

{/* PROFILE INSIGHTS */}
<div className="section-card">

  <div className="section-header">
    <h2>Your Profile Insights</h2>
  </div>

  <div className="insights-grid">

    <div className="insight-card">
      <span>⭐ Rating</span>
      <h3>{profile?.avgRating || 0}</h3>
    </div>

    <div className="insight-card">
      <span>💼 Experience</span>
      <h3>{profile?.experience || 0} Years</h3>
    </div>

    <div className="insight-card">
      <span>📍 Location</span>
      <h3>{profile?.location?.city || "N/A"}</h3>
    </div>

    <div className="insight-card">
      <span>💰 Expected Salary</span>
      <h3>₹{profile?.salaryExpected || 0}</h3>
    </div>

  </div>

</div>


{/* QUICK ACTIONS */}
<div className="section-card">

  <div className="section-header">
    <h2>Quick Actions</h2>
  </div>

  <div className="action-grid">

    <div
      className="action-card"
      onClick={() => navigate("/maid-profile")}
    >
      <h3>👤 Edit Profile</h3>

      <p>
        Update your profile and visibility.
      </p>
    </div>

    <div
      className="action-card"
      onClick={() => navigate("/maid-dashboard")}
    >
      <h3>📩 Requests</h3>

      <p>
        Manage incoming hiring requests.
      </p>
    </div>

    <div className="action-card">
      <h3>💼 Opportunities</h3>

      <p>
        Explore available work nearby.
      </p>
    </div>

  </div>

</div>

     
      {/* RECENT REQUESTS */}
      <div className="section-card">
        <div className="section-header">
          <h2>Recent Requests</h2>

          <button
            className="link-btn"
            onClick={() => navigate("/maid-dashboard")}
          >
            View All
          </button>
        </div>

        {requests.slice(0, 3).map((req) => (
          <div key={req._id} className="mini-card">
            <h4>{req.user?.name}</h4>
            <p>{req.user?.email}</p>
            <span className={`status ${req.status}`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>

      {/* OPPORTUNITIES */}
      <div className="section-card">
        <div className="section-header">
          <h2>Families Looking For Help</h2>

          <button
            className="link-btn"
            onClick={() => navigate("/maid-dashboard")}
          >
            View All
          </button>
        </div>

        {userNeeds.slice(0, 3).map((need) => (
  <div
    key={need._id}
    className="opportunity-card"
  >

    <div className="opportunity-header">

      <h4>
        📍 {need.location?.city},
        {" "}
        {need.location?.area}
      </h4>

      <span className="opportunity-tag">
        Hiring
      </span>

    </div>

    <div className="opportunity-body">

      <p className="work-needed">
        <strong>Need Help With:</strong>
      </p>

      <div className="work-tags">

        {need.workRequired?.map((work) => (
          <span
            key={work}
            className="work-tag"
          >
            {work}
          </span>
        ))}

      </div>

      <p className="budget">
        💰 Budget:
        {" "}
        ₹{need.budget || "Not Mentioned"}
      </p>

      <p className="opportunity-note">
        Looking for trusted workers.
      </p>

          </div>

        </div>
      ))}
      </div>

      {/* PROFILE STATUS */}
      <div className="section-card">
        <h2>Profile Status</h2>

        {profile ? (
          <>
            <p>✅ Profile Active</p>

            <p>
              Experience: {profile.experience} years
            </p>

            <p>
              Availability: {profile.availability}
            </p>

            <p>
              Expected Salary: ₹
              {profile.salaryExpected}
            </p>
          </>
        ) : (
          <>
            <p>
              Complete your profile to receive more
              hiring requests.
            </p>

            <button
              className="btn primary"
              onClick={() => navigate("/maid-dashboard")}
            >
              Complete Profile
            </button>
          </>
        )}
      </div>

    </div>
  );
}

export default MaidHome;