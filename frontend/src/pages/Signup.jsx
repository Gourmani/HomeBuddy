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
    identifier: "", // email OR phone
    password: "",
    role: roleFromURL || "user",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  // detect email vs phone
  const isEmail = form.identifier.includes("@");

  // SEND OTP
  const handleSendOTP = async () => {
    if (!form.identifier) {
      alert("Enter email or phone");
      return;
    }

    try {
      if (isEmail) {
        // EMAIL OTP
        await signupUser({
          name: form.name,
          email: form.identifier,
          password: "temp123456", // temp (not used finally)
          role: form.role,
        });
      } else {
        // PHONE OTP
        await API.post("/auth/send-phone-otp", {
          phone: form.identifier,
        });
      }

      alert("OTP sent");
      setOtpSent(true);

    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // VERIFY OTP
  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

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

      alert("Verified successfully");
      setVerified(true);

    } catch (error) {
      alert(error.response?.data?.message || "OTP failed");
    }
  };

  // FINAL SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please verify OTP first");
      return;
    }

    try {
      if (isEmail) {
        // already created user → just login redirect
        alert("Account created successfully");
        navigate("/login");
      } else {
        // PHONE → set password API
        await API.post("/auth/set-password", {
          phone: form.identifier,
          name: form.name,
          password: form.password,
          role: form.role,
        });

        alert("Account created successfully");
        navigate("/login");
      }

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
            <p>Verified profiles</p>
            <p>Local connections</p>
            <p>Safe and reliable</p>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>Create your account</h2>
          <p className="subtitle">
            Find reliable help for your home
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
              type="text"
              placeholder="Email or Phone"
              value={form.identifier}
              onChange={(e) =>
                setForm({ ...form, identifier: e.target.value })
              }
            />

            {!otpSent && (
              <button type="button" onClick={handleSendOTP}>
                Send OTP
              </button>
            )}

            {otpSent && !verified && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="button" onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}

            {verified && (
              <>
                <input
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

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