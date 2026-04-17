import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      {/* 🔥 TITLE */}
      <h1>Welcome to GrihSahayak</h1>
      <p>Find trusted maids and home services near you.</p>

      {/* 🔥 CTA BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        {!user ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </>
        ) : user.role === "user" ? (
          <button onClick={() => navigate("/maids")}>
            Find Maids
          </button>
        ) : (
          <button onClick={() => navigate("/maid-dashboard")}>
            Go to Dashboard
          </button>
        )}
      </div>

      {/* 🔥 FEATURES */}
      <hr />
      <h2>What we offer</h2>
      <ul>
        <li>✔ Verified Maid Profiles</li>
        <li>✔ Easy Contact Requests</li>
        <li>✔ Safe & Secure Platform</li>
      </ul>

      {/* 🔥 COMING SOON */}
      <hr />
      <h2>Coming Soon 🚀</h2>
      <ul>
        <li>👨‍🍳 Cook Services</li>
        <li>🚗 Drivers</li>
        <li>👷 Daily Labour</li>
        <li>🎉 Event & Party Helpers</li>
      </ul>

      <p>We are expanding to more services. Stay tuned!</p>
    </div>
  );
}

export default HomePage;