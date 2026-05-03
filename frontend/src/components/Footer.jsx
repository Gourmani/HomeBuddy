import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <div
            className="footer-logo"
            onClick={() => navigate("/")}
          >
            <img
              src="/images/logo.jpeg"
              alt="GrihSahayak"
            />
          </div>

          <p>
            Trusted home help services near you.
          </p>

          {/* SOCIAL ICONS */}
          <div className="footer-social">

            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/maids">Find Workers</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Contact Us</h4>

          <p>📍 Darbhanga, Bihar</p>
          <p>📧 support@grihsahayak.com</p>
          <p>📞 +91 6204078481</p>
        </div>

        {/* FEEDBACK */}
        <div className="footer-feedback">
          <h4>Got feedback?</h4>

          <p>
            We’d love to hear from you.
          </p>

          <button
            onClick={() => navigate("/feedback")}
            className="feedback-btn"
          >
            Give Feedback →
          </button>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GrihSahayak</p>
      </div>

    </footer>
  );
}

export default Footer;