// services/otpService.js

// 🔹 Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 🔹 Set OTP expiry (5 minutes)
export const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

// 🔹 Verify OTP
export const verifyOTP = (user, enteredOTP) => {
  if (!user.otp || !user.otpExpiry) {
    return {
      success: false,
      message: "No OTP found",
    };
  }

  //  Check expiry
  if (user.otpExpiry < new Date()) {
    return {
      success: false,
      message: "OTP expired",
    };
  }

  //  Check match
  if (user.otp !== enteredOTP) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  return {
    success: true,
    message: "OTP verified",
  };
};