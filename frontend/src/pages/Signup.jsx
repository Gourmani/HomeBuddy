// SAME IMPORTS (no change)
import { useState, useEffect } from "react";
import { signupUser } from "../services/authService";
import API from "../services/api";
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
    identifier: "",
    password: "",
    role: roleFromURL || "user",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const isEmail = form.identifier.includes("@");

  const handleSendOTP = async () => {
    if (!form.identifier) return alert("Enter email or phone");

    try {
      if (isEmail) {
        await signupUser({
          name: form.name,
          email: form.identifier,
          password: "temp123456",
          role: form.role,
        });
        setOtpSent(true);
      } else {
        const res = await API.post("/auth/send-phone-otp", {
          phone: form.identifier,
        });
        setOtpSent(true);
        alert(`Demo OTP: ${res.data.otp}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP failed");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (isEmail) {
        await API.post("/auth/verify-otp", {
          email: form.identifier,
          otp,
        });
      } else {
        await API.post("/auth/verify-phone-otp", {
          phone: form.identifier,
          otp,
        });
      }

      setVerified(true);
      alert("Verified successfully");
    } catch (err) {
      alert("OTP failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) return alert("Verify OTP first");

    try {
      if (!isEmail) {
        await API.post("/auth/set-password", {
          phone: form.identifier,
          name: form.name,
          password: form.password,
          role: form.role,
        });
      }

      alert("Account created");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE — SAME AS LOGIN */}
      <div className="auth-left">
        <div className="auth-image-wrapper">
          <img
            src="/images/auth-hero.png"
            alt="home services"
            className="auth-bg-image"
          />
          <div className="overlay"></div>
        </div>

        <div className="auth-left-content">
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
                      "Earn with flexibility",
                      2000,
                    ]
                  : [
                      "Find trusted workers near you",
                      2000,
                      "Hire without middlemen",
                      2000,
                      "Easy home services",
                      2000,
                    ]
              }
              speed={50}
              repeat={Infinity}
            />
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      
    {/* RIGHT SIDE */}
<div className="auth-right">
  <div className="auth-card">

    <h2>Create your account</h2>
    <p className="subtitle">Join and get started in seconds</p>

    <form onSubmit={handleSubmit}>

      {/* NAME */}
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>

      {/* EMAIL / PHONE */}
      <div className="form-group">
        <label>Email or Phone</label>
        <div className="input-with-btn">
          <input
            type="text"
            placeholder="Enter email or phone"
            value={form.identifier}
            onChange={(e) =>
              setForm({ ...form, identifier: e.target.value })
            }
          />

          {!otpSent && (
            <button
              type="button"
              className="secondary-btn"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          )}
        </div>
      </div>

      {/* OTP */}
      {otpSent && !verified && (
        <div className="form-group">
          <label>Enter OTP</label>

          <div className="input-with-btn">
            <input
              type="text"
              placeholder="6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              type="button"
              className="secondary-btn"
              onClick={handleVerifyOTP}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* PASSWORD */}
      {verified && (
        <>
          <div className="form-group">
            <label>Create Password</label>
            <input
              type="password"
              placeholder="Create strong password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button className="primary-btn">
            Create Account
          </button>
        </>
      )}

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