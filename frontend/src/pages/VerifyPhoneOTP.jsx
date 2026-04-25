import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyPhoneOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone;

  // redirect if no phone (direct access)
  useEffect(() => {
    if (!phone) {
      navigate("/phone-entry");
    }
  }, [phone, navigate]);

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-phone-otp", {
        phone,
        otp,
      });

      // NEW USER → SET PASSWORD
      if (res.data.isNewUser) {
        navigate("/set-password", { state: { phone } });
      } else {
        // EXISTING USER → LOGIN
        navigate("/login", { state: { phone } });
      }

    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Verify OTP</h2>

      <p>OTP sent to: {phone}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}

export default VerifyPhoneOTP;