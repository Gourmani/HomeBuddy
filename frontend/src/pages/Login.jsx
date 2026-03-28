import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);

    login(res.data);

    // ✅ ROLE-BASED REDIRECT
    if (res.data.role === "maid") {
      navigate("/maid-dashboard");
    } else {
      navigate("/"); // later → user-dashboard
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Login</button>
    </form>
  );
}

export default Login;