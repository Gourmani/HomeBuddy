import nodemailer from "nodemailer";

export const sendOTPEmail = async (to, otp) => {
  try {

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"GrihSahayak" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
    
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
      
      <h2 style="color: #2c3e50; text-align: center;">
        GrihSahayak Verification
      </h2>

      <p>Hello,</p>

      <p>Your OTP for signup is:</p>

      <h1 style="text-align: center; color: #007bff; letter-spacing: 3px;">
        ${otp}
      </h1>

      <p style="text-align: center;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <hr />

      <p style="font-size: 12px; color: gray;">
        If you did not request this, please ignore this email.
      </p>

      <p style="text-align: center; font-size: 14px;">
        — Team GrihSahayak
      </p>

    </div>
  </div>
`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    return { success: true };

  } catch (error) {
    console.error("FULL EMAIL ERROR:", error);
    return { success: false };
  }
};