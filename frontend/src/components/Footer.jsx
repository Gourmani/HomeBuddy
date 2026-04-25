import { useNavigate } from "react-router-dom";
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
            Find trusted maids, cooks, and helpers near you —
            without agents or middlemen.
          </p>

          <div className="footer-trust">
            <span> Verified Workers</span>
            <span> Local Services</span>
            <span> Direct Contact</span>
          </div>

        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Explore</h4>

          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/maids")}>Find Workers</span>
          <span onClick={() => navigate("/login")}>Login</span>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Get in touch</h4>

          <p>📍 Darbhanga, Bihar</p>
          <p>📧 support@grihsahayak.com</p>
          <p>📞 +91 XXXXX XXXXX</p>
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