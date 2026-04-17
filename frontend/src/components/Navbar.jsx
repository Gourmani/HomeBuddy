import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "20px", fontWeight: "bold" }}>
        GrihSahayak
      </span>

      {user ? (
        <>
          <button onClick={() => navigate("/")}>Home</button>

          {user.role === "user" && (
            <>
              <button onClick={() => navigate("/maids")}>Maids</button>
              <button onClick={() => navigate("/user-dashboard")}>
                My Requests
              </button>
            </>
          )}

          {user.role === "maid" && (
            <button onClick={() => navigate("/maid-dashboard")}>
              Dashboard
            </button>
          )}

          <button onClick={logout} style={{ marginLeft: "20px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </>
      )}
    </div>
  );
}

export default Navbar;