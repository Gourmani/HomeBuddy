import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaTools, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/bottomnav.css";

function BottomNav() {
  const { user } = useContext(AuthContext);
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
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("services");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // wait for page load
    } else {
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }}
>
  <FaTools />
  <span>Services</span>
</div>

      <div
        className={`nav-item ${isActive("/user-profile") ? "active" : ""}`}
        onClick={() => {
            if (!user) {
            navigate("/login");
            } else {
            navigate("/user-profile");
            }
        }}
        >
        <FaUser />
        <span>Profile</span>
</div>

    </div>
  );
}

export default BottomNav;