import baseTemplate from "./baseTemplate.js";

const otpTemplate = (otp, type = "signup") => {

  const heading =
    type === "reset"
      ? "Reset Your Password"
      : "Verify Your Account";

  const message =
    type === "reset"
      ? "Use the OTP below to reset your password."
      : "Use the OTP below to verify your account.";

  return baseTemplate(`

    <h2 style="
      margin-top:0;
      color:#0f172a;
      text-align:center;
    ">
      ${heading}
    </h2>

    <p style="
      color:#475569;
      font-size:16px;
      line-height:1.7;
      text-align:center;
    ">
      ${message}
    </p>

    <div style="
      margin:35px auto;
      background:#eff6ff;
      width:220px;
      text-align:center;
      padding:20px;
      border-radius:14px;
      border:2px dashed #2563eb;
    ">
      <div style="
        font-size:36px;
        letter-spacing:8px;
        font-weight:bold;
        color:#2563eb;
      ">
        ${otp}
      </div>
    </div>

    <p style="
      color:#64748b;
      font-size:14px;
      text-align:center;
      line-height:1.6;
    ">
      This OTP will expire in 10 minutes.
    </p>

    <p style="
      margin-top:30px;
      color:#ef4444;
      font-size:13px;
      text-align:center;
    ">
      Do not share this OTP with anyone.
    </p>

  `);
};

export default otpTemplate;