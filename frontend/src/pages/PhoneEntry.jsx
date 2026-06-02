import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PhoneEntry() {
const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleContinue = async () => {
// validation
if (!phone || phone.length < 10) {
  toast.error("Please enter a valid phone number");
  return;
}


try {
  setLoading(true);

  const res = await API.post("/auth/send-phone-otp", { phone });

  if (res.data.isExistingUser) {
    navigate("/login", { state: { phone } });
  } else {
    navigate("/verify-phone-otp", { state: { phone } });
  }

} catch (error) {
  toast.error(error.response?.data?.message || "Something went wrong");
} finally {
  setLoading(false);
}


};

return (
<div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}> <h2>Enter your phone</h2>


  <input
    type="tel"
    placeholder="Phone number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
  />

  <button
    onClick={handleContinue}
    disabled={loading}
    style={{ width: "100%", padding: "10px" }}
  >
    {loading ? "Please wait..." : "Continue"}
  </button>
</div>

);
}

export default PhoneEntry;
