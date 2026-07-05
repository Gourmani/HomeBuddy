// SAME IMPORTS (no change)
import { useState, useEffect } from "react";
import { signupUser } from "../services/authService";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import toast from "react-hot-toast";
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
  const [timer, setTimer] = useState(60);// for timer for resend otp 
  const [canResend, setCanResend] = useState(false);// timer for resend otp

  const isEmail = form.identifier.includes("@");
  // OTP TIMER LOGIC begins here
  useEffect(() => {
  let interval;

  if (otpSent && timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }

  if (timer === 0) {
    setCanResend(true);
  }

  return () => clearInterval(interval);
}, [otpSent, timer]);

// otp timer logic end here 
  const handleSendOTP = async () => {
  if (!form.identifier)
    return toast.error("Enter email or phone");

  if (isEmail && !form.password)
    return toast.error("Enter password");

  try {
    if (isEmail) {
      await signupUser({
        name: form.name,
        email: form.identifier,
        password: form.password,
        role: form.role,
      });

      setOtpSent(true);
      setTimer(60);
      setCanResend(false);

    } else {
      const res = await API.post("/auth/send-phone-otp", {
        phone: form.identifier,
      });

      setOtpSent(true);
      setTimer(60);
      setCanResend(false);
      toast.success(`Mobile OTP For Login : ${res.data.otp}`);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "OTP failed");
  }
};

   const handleResendOTP = async () => {
  try {

    if (isEmail) {
      await API.post("/auth/resend-otp", {
        email: form.identifier,
      });

    } else {
      const res = await API.post("/auth/send-phone-otp", {
        phone: form.identifier,
      });
      toast.success("OTP resent successfully");

      toast.success(`New OTP: ${res.data.otp}`);
    }

    setTimer(60);
    setCanResend(false);

  } catch (err) {
    toast.error("Failed to resend OTP");
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

      if (isEmail) {
        toast.success(
        `Welcome to HomeBuddy, ${form.name}!`
      );
        navigate("/login");
        return;
      }

      toast.success("Verified successfully");

    } catch (err) {
      toast.error("OTP failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) return toast.error("Verify OTP first");

    try {
      if (!isEmail) {
        await API.post("/auth/set-password", {
          phone: form.identifier,
          name: form.name,
          password: form.password,
          role: form.role,
        });
      }

      toast.success("Account created");
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed");
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
<div className="auth-right">
  <div className="auth-card">

       <h1 className="brand">HomeBuddy</h1>

          <h2>Register Here !   </h2>
          <p className="subtitle">Login to continue</p>

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
        </div>
      </div>


      {/* PASSWORD */}
      {(isEmail || verified) &&
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
}


{/* SEND OTP BUTTON */}
{!otpSent && (
  <button
    type="button"
    className="primary-btn"
    onClick={handleSendOTP}
  >
    Send OTP
  </button>
)}
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
             
             <div className="resend-section">

              {!canResend ? (
                <p className="timer-text">
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              )}

            </div>

          </div>
        </div>
      )}
{/* CREATE ACCOUNT BUTTON */}
{verified &&  !isEmail && (
  <button className="primary-btn">
    Create Account
  </button>
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