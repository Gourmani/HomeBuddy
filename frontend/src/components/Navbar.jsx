import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  //  REF for detecting outside click
  const menuRef = useRef();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  //  OUTSIDE CLICK LOGIC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="navbar-left" onClick={() => handleNavigate("/")}>
        <img
          src="/images/logo.jpeg"
          alt="GrihSahayak"
          className="navbar-logo-img"
        />
      </div>

      {/* MENU ICON */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* LINKS */}
      <div
        ref={menuRef}  
        className={`navbar-right ${menuOpen ? "open" : ""}`}
      >

        {user ? (
          <>
            <button
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => handleNavigate("/")}
            >
              Home
            </button>

            {user.role === "user" && (
              <>
                <button
                  className={`nav-link ${isActive("/maids") ? "active" : ""}`}
                  onClick={() => handleNavigate("/maids")}
                >
                  Find Workers
                </button>

                <button
                  className={`nav-link ${isActive("/user-dashboard") ? "active" : ""}`}
                  onClick={() => handleNavigate("/user-dashboard")}
                >
                  My Requests
                </button>
              </>
            )}

            {user.role === "maid" && (
              <button
                className={`nav-link ${isActive("/maid-dashboard") ? "active" : ""}`}
                onClick={() => handleNavigate("/maid-dashboard")}
              >
                Dashboard
              </button>
            )}

            {/* AVATAR */}
            <div
              className="avatar"
              onClick={() =>
                handleNavigate(
                  user.role === "maid" ? "/maid-profile" : "/user-profile"
                )
              }
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-link"
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>

            <button
              className="primary-btn"
              onClick={() => handleNavigate("/choose-role")}
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