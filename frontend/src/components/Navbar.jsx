import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">

      {/* LEFT - LOGO */}
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          Grih<span>Sahayak</span>
        </div>
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

            <button className="logout-btn" onClick={logout}>
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