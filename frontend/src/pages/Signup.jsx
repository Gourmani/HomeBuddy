import { useState, useEffect } from "react";
import { signupUser } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const roleFromURL = queryParams.get("role");

  useEffect(() => {
    if (!roleFromURL) {
      navigate("/choose-role");
    }
  }, [roleFromURL, navigate]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roleFromURL || "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT */}
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
              sequence={
                form.role === "maid"
                  ? [
                      "Get job requests near you",
                      2000,
                      "Work with trusted families",
                      2000,
                      "Earn with flexible timings",
                      2000,
                    ]
                  : [
                      "Find trusted workers near you",
                      2000,
                      "Hire without middlemen",
                      2000,
                      "Get help for your home easily",
                      2000,
                    ]
              }
              speed={50}
              repeat={Infinity}
            />
          </div>

          <div className="auth-features">
            <p>✔ Verified profiles</p>
            <p>✔ Local connections</p>
            <p>✔ Safe & reliable</p>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>
            {form.role === "maid"
              ? "Start your journey as a worker"
              : "Create your account"}
          </h2>

          <p className="subtitle">
            {form.role === "maid"
              ? "Get discovered by nearby households"
              : "Find reliable help for your home"}
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Create password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="primary-btn">
              {form.role === "maid"
                ? "Start Working"
                : "Create Account"}
            </button>

          </form>

          <p className="switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;