import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email });

      alert("OTP sent to your email");

      // 👉 go to reset page
      navigate("/reset-password", { state: { email } });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;