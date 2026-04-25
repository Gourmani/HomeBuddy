import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import MaidCard from "../components/MaidCard";
import { getMaidProfiles } from "../services/maidService";
import API from "../services/api";
import "../styles/home.css";

const services = [
  {
    title: "Home Cleaning",
    desc: "Daily or part-time cleaning support",
    image: "/images/s1.jpg",
  },
  {
    title: "Home Cooking",
    desc: "Veg & non-veg experienced cooks",
    image: "/images/s2.jpg",
  },
  {
    title: "Babysitting",
    desc: "Safe and trusted childcare",
    image: "/images/s3.jpg",
  },
  {
    title: "Elder Care",
    desc: "Basic support for elderly members",
    image: "/images/s4.jpg",
  },
];

const futureServices = [
  {
    title: "Event Helpers",
    desc: "Hire workers for weddings & events",
    image: "/images/f1.jpg",
  },
  {
    title: "Drivers",
    desc: "Find drivers for daily needs",
    image: "/images/f2.jpg",
  },
  {
    title: "Party Cooks",
    desc: "Book cooks for small gatherings",
    image: "/images/f3.jpg",
  },
  {
    title: "Daily Wage Workers",
    desc: "Workers for short-term tasks",
    image: "/images/f4.jpg",
  },
];

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [maids, setMaids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        let res;

        if (user && user.role === "user") {
          res = await API.get("/maids/matched");
        } else {
          res = await getMaidProfiles({});
        }

        setMaids(res?.data?.data?.slice(0, 8) || []);
      } catch (err) {
        console.error("Error fetching maids:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaids();
  }, [user]);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">

          <div className="hero-badge">
            ⭐ Trusted by local households
          </div>

          <h1>
            <TypeAnimation
              sequence={[
                "Find Trusted Workers in Your Area",
                2000,
                "Hire Without Agents",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <p>
            Connect directly with verified maids, cooks, and helpers near you.
            No middlemen. No hassle.
          </p>

          <div className="hero-buttons">
            {!user ? (
              <>
                <button
                  className="btn primary"
                  onClick={() => navigate("/choose-role")}
                >
                  Get Started
                </button>
                <button
                  className="btn ghost"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="btn primary"
                onClick={() => navigate("/maids")}
              >
                Find Workers
              </button>
            )}
          </div>
        </div>

        <div className="hero-right">
  <img src="/images/hero.jpeg" alt="workers" />
</div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container">
          <div className="trust-grid">

            <div className="trust-item">
              <h4>✔ Verified Workers</h4>
              <p>Trusted by local families</p>
            </div>

            <div className="trust-item">
              <h4>📍 Nearby Only</h4>
              <p>Workers from your area</p>
            </div>

            <div className="trust-item">
              <h4>🤝 No Middleman</h4>
              <p>Direct hiring process</p>
            </div>

            <div className="trust-item">
              <h4>💬 Direct Contact</h4>
              <p>Talk before hiring</p>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="container">
          <h2>Services You Can Hire For</h2>

          <div className="service-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKERS */}
      <section className="workers">
        <div className="container">

          <div className="section-header">
            <h2>Workers Near You</h2>
            <button onClick={() => navigate("/maids")}>
              View All →
            </button>
          </div>

          <div className="worker-slider">
            {loading ? (
              <p className="loading">Loading workers...</p>
            ) : maids.length === 0 ? (
              <div className="empty-state">
                <p>No workers found in your area.</p>
                {!user && (
                  <button onClick={() => navigate("/login")}>
                    Login to see better matches
                  </button>
                )}
              </div>
            ) : (
              maids.map((maid) => (
                <MaidCard key={maid._id} maid={maid} />
              ))
            )}
          </div>

        </div>
      </section>

      {/* FUTURE SERVICES */}
      <section className="future-services">
        <div className="container">

          <h2>More Services Coming Soon</h2>
          <p className="future-subtitle">
            We’re expanding to serve all your daily needs
          </p>

          <div className="future-grid">
            {futureServices.map((service, index) => (
              <div key={index} className="future-card">
                <img src={service.image} alt={service.title} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Find Trusted Workers in Your City Today</h2>
          <p>Start hiring within minutes.</p>

          <button
            className="btn primary"
            onClick={() => navigate("/maids")}
          >
            Explore Workers
          </button>
        </div>
      </section>

    </div>
  );
}

export default HomePage;