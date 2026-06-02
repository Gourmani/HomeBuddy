import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import API from "../services/api";// IMPORTANT
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import toast from "react-hot-toast";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({
  identifier: "", // email OR phone
  password: "",
});

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // detect email vs phone
      const isEmail = form.identifier.includes("@");

      const payload = {
        password: form.password,
      };

      if (isEmail) {
        payload.email = form.identifier;
      } else {
        payload.phone = form.identifier;
      }

      const res = await loginUser(payload);
      login(res.data);

      toast.success( `Welcome back, ${res.data?.name || "User"}!`);// for implementing toast notification

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
      toast.error(
      error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
  <div className="auth-page">

    {/* LEFT SIDE */}
    <div className="auth-left">
      <div className="auth-image-wrapper">
        <img
          src="/images/auth-hero.png"
          alt="home services"
        />
      </div>

      <div className="auth-left-content">
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

       
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="auth-right">
      <div className="auth-card">

        <h1 className="brand">HomeBuddy</h1>

          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
  <label>Email or Phone</label>
  <input
    type="text"
    placeholder="Enter email or phone"
    value={form.identifier}
    onChange={(e) =>
      setForm({ ...form, identifier: e.target.value })
    }
  />
</div>

<div className="form-group">
  <label>Password</label>
  <input
    type="password"
    placeholder="Enter your password"
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />
</div>

          <p
            style={{ cursor: "pointer", color: "#2563eb", fontSize: "14px" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

          <button className="primary-btn">
            Login
          </button>

          {/* DIVIDER 
          <div className="divider">
         <span>or</span>
        </div>

                    <button className="google-btn">
              <img src="/images/google.webp" alt="google" className="google-icon" />
              Continue with Google
            </button>

            */}
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