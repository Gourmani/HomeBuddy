import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  //  NEW LOGOUT HANDLER (IMPORTANT FIX)
  const handleLogout = () => {
    logout();        // clear user
    navigate("/");   // redirect to home
  };

  return (
    <nav className="navbar">

      <div className="navbar-left" onClick={() => navigate("/")}>
  <img
    src="/images/logo.jpeg"
    alt="GrihSahayak"
    className="navbar-logo-img"
  />
</div>

      {/* RIGHT - LINKS */}
      <div className="navbar-right">

        {user ? (
          <>
            <button
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              Home
            </button>

            {user.role === "user" && (
              <>
                <button
                  className={`nav-link ${isActive("/maids") ? "active" : ""}`}
                  onClick={() => navigate("/maids")}
                >
                  Find Workers
                </button>

                <button
                  className={`nav-link ${isActive("/user-dashboard") ? "active" : ""}`}
                  onClick={() => navigate("/user-dashboard")}
                >
                  My Requests
                </button>
              </>
            )}

            {user.role === "maid" && (
              <button
                className={`nav-link ${isActive("/maid-dashboard") ? "active" : ""}`}
                onClick={() => navigate("/maid-dashboard")}
              >
                Dashboard
              </button>
            )}

            {/* 👤 PROFILE */}
            <button
              className="nav-link"
              onClick={() =>
                navigate(user.role === "maid" ? "/maid-profile" : "/user-profile")
              }
            >
              👤 Profile
            </button>

            {/*  UPDATED LOGOUT */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-link"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/choose-role")}
            >
              Get Started
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;