import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  // If user opens page directly → redirect
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  // Verify OTP
  const handleVerify = async () => {
    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success("Account verified successfully");

      // After verification → go to login
      navigate("/login");

    } catch (error) {
      toast.error(
  error.response?.data?.message || "Verification failed"
);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await API.post("/auth/resend-otp", { email });

      toast.success("OTP resent successfully");

    } catch (error) {
      toast.error(
      error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Verify OTP</h2>

      <p>OTP sent to: {email}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button
        onClick={handleVerify}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Verify
      </button>

      <button
        onClick={handleResend}
        style={{ width: "100%", padding: "10px" }}
      >
        Resend OTP
      </button>
    </div>
  );
}

export default VerifyOTP;