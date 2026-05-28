import nodemailer from "nodemailer";

import otpTemplate from "../templates/emails/otpTemplate.js";
import welcomeTemplate from "../templates/emails/welcomeTemplate.js";
import baseTemplate from "../templates/emails/baseTemplate.js";

// ==========================
// TRANSPORTER
// ==========================

// ==========================
// CREATE TRANSPORTER
// ==========================
const createTransporter = () => {

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

};
// ==========================
// COMMON SEND FUNCTION
// ==========================
const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  console.log("INSIDE sendEmail");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"GrihSahayak" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error.message);
    throw error;
  }
};

// ==========================
// OTP EMAIL
// ==========================
export const sendOTPEmail = async (
  to,
  otp,
  type = "signup"
) => {

  const subject =
    type === "reset"
      ? "Reset Password OTP"
      : "Verify Your Account";

  await sendEmail({
    to,
    subject,
    html: otpTemplate(otp, type),
  });
};

// ==========================
// WELCOME EMAIL
// ==========================
export const sendWelcomeEmail = async (
  to,
  name
) => {

  await sendEmail({
    to,
    subject: "Welcome to GrihSahayak 🎉",
    html: welcomeTemplate(name),
  });
};

// ==========================
// REQUEST EMAIL
// ==========================
export const sendRequestEmail = async (
  to,
  userName
) => {

  const html = baseTemplate(`

    <h2 style="
      color:#0f172a;
      text-align:center;
    ">
      New Service Request
    </h2>

    <p style="
      font-size:16px;
      color:#475569;
      line-height:1.8;
      text-align:center;
    ">
      <b>${userName}</b> has sent you a new work request.
    </p>

    <div style="
      margin-top:30px;
      background:#eff6ff;
      padding:20px;
      border-radius:12px;
      text-align:center;
    ">
      Login to your dashboard to review the request.
    </div>

  `);

  await sendEmail({
    to,
    subject: "New Request Received",
    html,
  });
};

// ==========================
// STATUS EMAIL
// ==========================
export const sendStatusEmail = async (
  to,
  maidName,
  status
) => {

  const isAccepted = status === "accepted";

  const html = baseTemplate(`

    <h2 style="
      color:${isAccepted ? "#16a34a" : "#dc2626"};
      text-align:center;
    ">
      Request ${status}
    </h2>

    <p style="
      font-size:16px;
      color:#475569;
      line-height:1.8;
      text-align:center;
    ">
      Your request to <b>${maidName}</b>
      was <b>${status}</b>.
    </p>

  `);

  await sendEmail({
    to,
    subject: `Request ${status}`,
    html,
  });
};