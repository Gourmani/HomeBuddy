import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function SetPassword() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone;

  // redirect if accessed directly
  useEffect(() => {
    if (!phone) {
      navigate("/phone-entry");
    }
  }, [phone, navigate]);

  const handleSubmit = async () => {
    if (!form.name || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/set-password", {
        phone,
        name: form.name,
        password: form.password,
        role: form.role,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect to dashboard/profile flow
      navigate("/user-dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Complete Your Profile</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Create Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <select
        value={form.role}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="user">User</option>
        <option value="maid">Maid</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}

export default SetPassword;