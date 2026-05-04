import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaTools, FaUser } from "react-icons/fa";
import "../styles/bottomnav.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">

      <div
        className={`nav-item ${isActive("/") ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <FaHome />
        <span>Home</span>
      </div>

      <div
        className={`nav-item ${isActive("/maids") ? "active" : ""}`}
        onClick={() => navigate("/maids")}
      >
        <FaSearch />
        <span>Workers</span>
      </div>

      <div
            className="nav-item"
            onClick={() => {
                const section = document.getElementById("services");
                if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                }
            }}
            >
            <FaTools />
            <span>Services</span>
            </div>

      <div
        className={`nav-item ${isActive("/user-profile") ? "active" : ""}`}
        onClick={() => navigate("/user-profile")}
      >
        <FaUser />
        <span>Profile</span>
      </div>

    </div>
  );
}

export default BottomNav;