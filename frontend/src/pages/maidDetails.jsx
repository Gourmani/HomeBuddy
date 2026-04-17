import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

function MaidDetails() {
  const { id } = useParams();

  const [maid, setMaid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState(null);
  const [sending, setSending] = useState(false);

  // 🔥 REVIEW STATES
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // 🔹 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const maidRes = await API.get(`/maids/${id}`);
        setMaid(maidRes.data.data);

        const statusRes = await API.get(`/requests/status/${id}`);
        setRequestStatus(statusRes.data.status);

        const reviewRes = await API.get(`/reviews/${id}`);
        setReviews(reviewRes.data.data);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔹 SEND REQUEST
  const handleRequest = async () => {
    try {
      setSending(true);

      await API.post("/requests", {
        maidId: maid._id,
      });

      alert("Request sent successfully!");
      setRequestStatus("pending");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  // 🔹 SUBMIT REVIEW
  const handleReview = async () => {
    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    try {
      await API.post("/reviews", {
        maidId: maid._id,
        rating,
        comment,
      });

      alert("Review added!");

      const reviewRes = await API.get(`/reviews/${id}`);
      setReviews(reviewRes.data.data);

      setComment("");
      setRating(5);

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  if (loading) return <Loader />;
  if (!maid) return <p>Maid not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{maid.user?.name}</h2>

      {/* ⭐ AVG RATING (FIXED) */}
      <p>
        <strong>Rating:</strong> ⭐{" "}
        {maid?.avgRating ? maid.avgRating.toFixed(1) : "No ratings"} (
        {maid?.numReviews || 0} reviews)
      </p>

      <p><strong>Work:</strong> {maid.workType}</p>
      <p><strong>Experience:</strong> {maid.experience} years</p>
      <p><strong>Salary:</strong> ₹{maid.salaryExpected} ({maid.salaryType})</p>
      <p><strong>Availability:</strong> {maid.availability}</p>
      <p><strong>City:</strong> {maid.location?.city || "N/A"}</p>
      <p><strong>Area:</strong> {maid.location?.area || "N/A"}</p>

      <p><strong>Description:</strong></p>
      <p>{maid.description}</p>

      <hr />

      {/* 🔥 REQUEST LOGIC */}
      {requestStatus === "accepted" ? (
        <div>
          <h3>Contact Available</h3>
          <p><strong>Email:</strong> {maid.user?.email}</p>
          <p><strong>Phone:</strong> {maid.phone || "N/A"}</p>
        </div>

      ) : requestStatus === "pending" ? (
        <button disabled>Request Pending...</button>

      ) : requestStatus === "rejected" ? (
        <button disabled>Request Rejected</button>

      ) : (
        <button onClick={handleRequest} disabled={sending}>
          {sending ? "Sending..." : "Request Contact"}
        </button>
      )}

      <hr />

      {/* 🔥 REVIEW FORM */}
      {requestStatus === "accepted" && (
        <>
          <h3>Give Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <br />

          <button onClick={handleReview}>
            Submit Review
          </button>

          <hr />
        </>
      )}

      {/* 🔥 REVIEWS LIST */}
      <h3>Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} style={{ marginBottom: "10px" }}>
            <p><strong>{r.user?.name}</strong></p>
            <p>⭐ {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MaidDetails;