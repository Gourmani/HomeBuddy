import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "../styles/chooseRole.css";

function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="choose-role-page">

      {/* LEFT */}
      <div className="choose-left">

        <div className="auth-image-wrapper">
          <img
            src="/images/auth-hero.png"
            alt="home services"
            className="auth-bg-image"
          />
          
        </div>

        <div className="auth-left-content">
                <h1>GrihSahayak</h1>
        
                <div className="typing-text">
                  <TypeAnimation
                    sequence={[
                      "Find trusted workers near you",
                      2000,
                      "Hire without middlemen",
                      2000,
                      "Safe & reliable home help",
                      2000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                </div>
                </div>

        <div className="choose-features">
          <p>✔ Verified & trusted profiles</p>
          <p>✔ Workers from your locality</p>
          <p>✔ No middleman, direct contact</p>
        </div>

      </div>

      {/* RIGHT */}
      <div className="choose-right">
        <div className="choose-card">

          <h2>Welcome to GrihSahayak</h2>
          <p className="subtitle">
            Choose your role to get started
          </p>

          <div className="role-options">

            <div
              className="role-option"
              onClick={() => navigate("/signup?role=user")}
            >
              <h3>For Your Home</h3>
              <p>
                Find reliable maids, cooks, and helpers near your home.
              </p>
              <button>Continue as User →</button>
            </div>

            <div
              className="role-option"
              onClick={() => navigate("/signup?role=maid")}
            >
              <h3>I want to find work</h3>
              <p>
                Find jobs and start earning as a maid, cook, or helper in your locality.
              </p>
              <button>Continue as Worker →</button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ChooseRole;