import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "../styles/chooseRole.css";

function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="choose-role-page">

      {/* LEFT */}
      <div className="choose-left">

        <img
          src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
          alt="home help"
          className="choose-illustration"
        />

        <h1>Welcome to GrihSahayak</h1>

        {/*  TYPING TEXT ADDED HERE */}
        <div className="typing-text">
          <TypeAnimation
            sequence={[
              "Find trusted workers near you",
              2000,
              "Hire without middlemen",
              2000,
              "Get help for your home easily",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
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

          <h2>How do you want to use GrihSahayak?</h2>
          <p className="subtitle">
            Choose your role to get started
          </p>

          <div className="role-options">

            <div
              className="role-option"
              onClick={() => navigate("/signup?role=user")}
            >
              <h3>I want to hire a worker</h3>
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
                Get job requests from nearby families and start earning.
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