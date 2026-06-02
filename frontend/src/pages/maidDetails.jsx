import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
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

      toast.success(
        `Request sent to ${maid.user?.name}. You'll be notified when the maid responds.`
      );
      setRequestStatus("pending");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to send request"
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader />;
  if (!maid) return <p className="not-found">Maid not found</p>;

  return (
  <div className="details-container">

    {/* HERO HEADER */}
    <div className="profile-card">

      <div className="profile-left">
        <img
          src={maid.profileImage || "/images/mci.jpg"}
          alt="maid"
          className="profile-img"
        />

        <div>
          <h1>{maid.user?.name}</h1>

          <p className="headline">
            Trusted Home Service Professional
          </p>

          <p className="work-tag">
            {Array.isArray(maid.workType)
              ? maid.workType.join(", ")
              : maid.workType}
          </p>

          <span className="badge">✔ Verified</span>

          {/*  QUICK STATS */}
          <div className="quick-stats">
            <div>
              <strong>{maid.experience}</strong>
              <span>Years Exp</span>
            </div>

            <div>
              <strong>{maid.numReviews || 0}</strong>
              <span>Reviews</span>
            </div>

            <div>
              <strong>{maid.avgRating?.toFixed(1) || 0}</strong>
              <span>Rating</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* MAIN LAYOUT */}
    <div className="details-layout">

      {/* LEFT */}
      <div className="left-section">

        {/* BASIC INFO */}
        <div className="card">
          <h3 className="section-title">Basic Information</h3>

          <div className="info-grid">
            <div>
              <span>Experience</span>
              <strong>{maid.experience} yrs</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong>{maid.availability}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                {maid.location?.area}, {maid.location?.city}
              </strong>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="card">
          <h3 className="section-title">About</h3>
          <p>{maid.description || "No description provided"}</p>
        </div>

        {/* REVIEWS */}
        <div className="card">
          <h3 className="section-title">Customer Reviews</h3>

          {reviews.length === 0 ? (
            <p className="empty">
              No reviews yet — Be the first to hire and review!
            </p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="review-card">
                <p className="review-name">{r.user?.name}</p>

                <p className="review-rating">
                  {"⭐".repeat(r.rating)} ({r.rating})
                </p>

                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RIGHT */}
      <div className="right-section">

        <div className="sticky-card">

          <h3 className="summary-title">Hire Summary</h3>

          <p className="salary">
            ₹{maid.salaryExpected} / {maid.salaryType}
          </p>

          <p className="location">
            📍 {maid.location?.area}, {maid.location?.city}
          </p>

          <p className="availability">
            ⏱ {maid.availability}
          </p>

          <p className="urgency">
            ⚡ High demand in your area
          </p>

          <p className="trust-line">
            ✔ Verified profile • Safe hiring
          </p>

          {/* STATUS */}
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
              {sending ? "Sending..." : "Send Hiring Request"}
            </button>
          )}

        </div>

      </div>

    </div>
  </div>
);
}

export default MaidDetails;