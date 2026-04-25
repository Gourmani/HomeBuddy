import nodemailer from "nodemailer";

// ==========================
// COMMON FUNCTION
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
// OTP EMAIL
// ==========================
export const sendOTPEmail = async (to, otp, type = "signup") => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"GrihSahayak" <${process.env.EMAIL_USER}>`,
      to,
      subject: "OTP",
      html: `<h1>${otp}</h1>`,
    });

  } catch (error) {
    console.error("OTP EMAIL ERROR:", error.message);
  }
};

// ==========================
// REQUEST EMAIL
// ==========================
export const sendRequestEmail = async (to, userName) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"GrihSahayak" <${process.env.EMAIL_USER}>`,
      to,
      subject: "New Request",
      html: `<p>${userName} sent you a request</p>`,
    });

  } catch (error) {
    console.error("REQUEST EMAIL ERROR:", error.message);
  }
};

// ==========================
// STATUS EMAIL
// ==========================
export const sendStatusEmail = async (to, maidName, status) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"GrihSahayak" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Request ${status}`,
      html: `<p>Your request to ${maidName} was ${status}</p>`,
    });

  } catch (error) {
    console.error("STATUS EMAIL ERROR:", error.message);
  }
};