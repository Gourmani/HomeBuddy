import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success(
       "Password reset successfully. Please login."
       );

      navigate("/login");

    } catch (error) {
     toast.error(
  error.response?.data?.message || "Error"
    );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;