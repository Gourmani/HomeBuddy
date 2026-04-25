import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import API from "../services/api";// IMPORTANT
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      login(res.data);

      //  MAID FLOW
      if (res.data.role === "maid") {
        navigate("/maid-dashboard");
      }

      // USER FLOW
      else {
        try {
          const resProfile = await API.get("/user-profile/me");

          console.log("PROFILE FOUND:", resProfile.data);

          // profile exists
          navigate("/");

        } catch (err) {
          if (err.response?.status === 404) {
            console.log("PROFILE NOT FOUND");

            // no profile → go create profile
            navigate("/user-dashboard");
          } else {
            console.log("OTHER ERROR:", err);
          }
        }
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">
        <div className="auth-left-content">

          <img
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="home help"
            className="auth-illustration"
          />

          <h1>GrihSahayak</h1>

          <div className="typing-text">
            <TypeAnimation
              sequence={[
                "Find trusted workers near you",
                2000,
                "Hire without middlemen",
                2000,
                "Safe & reliable home help",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>

          <div className="auth-features">
            <p>Verified local workers</p>
            <p>Direct contact</p>
            <p>No middleman</p>
          </div>

        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">

          <h2>Welcome Back</h2>
          <p className="subtitle">
            Login to continue
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <p
              style={{ cursor: "pointer", color: "blue", fontSize: "14px" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>

            <button className="primary-btn">
              Login
            </button>
          </form>

          <p className="switch">
            New here?{" "}
            <span onClick={() => navigate("/choose-role")}>
              Create account
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;