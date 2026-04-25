import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import "../styles/maidDetails.css";

function MaidDetails() {
  const { id } = useParams();

  const [maid, setMaid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [reviews, setReviews] = useState([]);

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

  const handleRequest = async () => {
    try {
      setSending(true);
      await API.post("/requests", { maidId: maid._id });

      alert("Request sent successfully!");
      setRequestStatus("pending");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader />;
  if (!maid) return <p className="not-found">Maid not found</p>;

  return (
    <div className="details-container">

      {/* HEADER */}
      <div className="profile-card">

        <div className="profile-left">
          <img
            src={maid.profileImage || "/images/mci.jpg"}
            alt="maid"
            className="profile-img"
          />

          <div>
            <h1>{maid.user?.name}</h1>

            <p className="work-tag">
              {Array.isArray(maid.workType)
                ? maid.workType.join(", ")
                : maid.workType}
            </p>

            <span className="badge">✔ Verified</span>
          </div>
        </div>

        <div className="rating">
          ⭐ {maid?.avgRating ? maid.avgRating.toFixed(1) : "0"}
          <span> ({maid?.numReviews || 0} reviews)</span>
        </div>

      </div>

      {/* MAIN */}
      <div className="details-layout">

        {/* LEFT */}
        <div className="left-section">

          <div className="card">
            <h3 className="section-title">Basic Information</h3>
            <p><strong>Experience:</strong> {maid.experience} years</p>
            <p><strong>Availability:</strong> {maid.availability}</p>
            <p><strong>Location:</strong> {maid.location?.area}, {maid.location?.city}</p>
          </div>

          <div className="card">
            <h3 className="section-title">About</h3>
            <p>{maid.description || "No description provided"}</p>
          </div>

          <div className="card">
            <h3 className="section-title">Customer Reviews</h3>

            {reviews.length === 0 ? (
              <p className="empty">No reviews yet — be the first to hire!</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="review-card">
                  <p className="review-name">{r.user?.name}</p>
                  <p className="review-rating">⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="right-section">

          <div className="sticky-card">

            <h3 className="summary-title">Profile Summary</h3>

            <p className="salary">
              ₹{maid.salaryExpected} / {maid.salaryType}
            </p>

            <p className="location">
              📍 {maid.location?.area}, {maid.location?.city}
            </p>

            <p className="availability">
              ⏱ {maid.availability}
            </p>

            <div className="status-box">
              {requestStatus === "accepted" && (
                <span className="status accepted">Accepted</span>
              )}
              {requestStatus === "pending" && (
                <span className="status pending">Request Sent</span>
              )}
              {requestStatus === "rejected" && (
                <span className="status rejected">Rejected</span>
              )}
            </div>

            {/* CTA */}
            {requestStatus === "accepted" ? (
              <div className="contact-box">
                <p><strong>Email:</strong> {maid.user?.email}</p>
                <p><strong>Phone:</strong> {maid.phone}</p>
              </div>
            ) : requestStatus === "pending" ? (
              <button className="btn disabled full">Request Sent</button>
            ) : requestStatus === "rejected" ? (
              <button className="btn red full">Request Rejected</button>
            ) : (
              <button
                className="btn primary full"
                onClick={handleRequest}
                disabled={sending}
              >
                {sending ? "Sending..." : "Hire Now"}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MaidDetails;