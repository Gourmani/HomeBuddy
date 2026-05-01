import React, { useState } from "react";
import axios from "axios";
import "../styles/feedback.css";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

     await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, form);

      alert("Feedback submitted successfully ✅");

      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">

        <h2>Give Feedback</h2>
        <p className="feedback-subtitle">
            Help us improve your experience
            </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Write your feedback..."
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button type="submit">
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Feedback;