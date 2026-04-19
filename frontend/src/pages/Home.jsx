import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import MaidCard from "../components/MaidCard";
import { getMaidProfiles } from "../services/maidService";
import "../styles/home.css";

function HomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [maids, setMaids] = useState([]);

  useEffect(() => {
    const fetchMaids = async () => {
      try {
        const res = await getMaidProfiles({});
        setMaids(res?.data?.data?.slice(0, 8) || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMaids();
  }, []);

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
                "Find Trusted Home Help Near You",
                2000,
                "Hire Without Agents",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </h1>

          <p>
            Hire verified maids, cooks, and helpers from your locality —
            safe, direct, and hassle-free.
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
            alt="home help"
          />
        </div>

      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container">
          <div className="trust-grid">

            <div className="trust-item">
              <div className="icon">✔</div>
              <div>
                <h4>Verified Workers</h4>
                <p>Checked via local references</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="icon">📍</div>
              <div>
                <h4>Nearby Only</h4>
                <p>Workers from your locality</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="icon">🤝</div>
              <div>
                <h4>No Middleman</h4>
                <p>Direct hiring, no agents</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="icon">💬</div>
              <div>
                <h4>Direct Contact</h4>
                <p>Talk before hiring</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="container">
          <h2>Services You Can Hire For</h2>

          <div className="service-grid">

            <div className="service-card">
              <h3>Home Cleaning</h3>
              <p>Daily or part-time cleaning support</p>
            </div>

            <div className="service-card">
              <h3>Home Cooking</h3>
              <p>Veg & non-veg experienced cooks</p>
            </div>

            <div className="service-card">
              <h3>Babysitting</h3>
              <p>Safe and trusted childcare</p>
            </div>

            <div className="service-card">
              <h3>Elder Care</h3>
              <p>Basic support for elderly members</p>
            </div>

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
            {maids.length === 0 ? (
              <p className="empty">
                No workers available in your area yet.
              </p>
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
      We’re expanding to serve all your daily and event needs
    </p>

    <div className="future-grid">

      <div className="future-card">
        <h3>Event Helpers</h3>
        <p>Hire workers for weddings, functions & events</p>
      </div>

      <div className="future-card">
        <h3>Drivers</h3>
        <p>Find drivers for daily or temporary needs</p>
      </div>

      <div className="future-card">
        <h3>Party Cooks</h3>
        <p>Book cooks for small gatherings & parties</p>
      </div>

      <div className="future-card">
        <h3>Daily Wage Workers</h3>
        <p>Hire workers for short-term tasks</p>
      </div>

    </div>

  </div>
</section>


      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Stop Searching. Start Hiring.</h2>
          <p>
            Find verified workers near you in just a few clicks.
          </p>

          <button
            className="btn primary"
            onClick={() => navigate("/maids")}
          >
            Explore Workers
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>GrihSahayak</h3>
        <p>Connecting homes with trusted local workers.</p>

        <div className="footer-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/maids")}>Workers</span>
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </footer>

    </div>
  );
}

export default HomePage;