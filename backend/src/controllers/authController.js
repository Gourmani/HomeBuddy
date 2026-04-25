import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../services/emailService.js";

// 🔹 GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 GENERATE OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==========================
//  SIGNUP WITH OTP
// ==========================
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      otp,
      otpExpiry,
    });

    //  SEND EMAIL
    await sendOTPEmail(email, otp,"signup");

    res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to your email",
      email: user.email, // helpful for frontend
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
//  VERIFY OTP
// ==========================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    //  VERIFY USER
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
//  LOGIN (BLOCK IF NOT VERIFIED)
// ==========================
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({
      $or: [
        email ? { email } : null,
        phone ? { phone } : null,
      ].filter(Boolean),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // check verification
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your account first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================
//  RESEND OTP (IMPORTANT)
// ==========================
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    await sendOTPEmail(email, otp,"signup");

    res.json({
      success: true,
      message: "OTP resent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
//  FORGOT PASSWORD (SEND OTP)
// ==========================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    await sendOTPEmail(email, otp,"reset");

    res.json({
      success: true,
      message: "OTP sent for password reset",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
//  RESET PASSWORD (VERIFY OTP + CHANGE PASSWORD)
// ==========================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //  VERIFY OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    //  UPDATE PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    //  CLEAR OTP
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// SEND PHONE OTP
// ==========================
export const sendPhoneOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    let user = await User.findOne({ phone });

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    
    if (user) {
  //  If user already has real password → don't send OTP
  if (user.hasPassword) {
    return res.json({
      success: true,
      isExistingUser: true,
      message: "User already exists, please login",
    });
  }

  // else → still new user (no password yet)
  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();
}
     else {
      // new user → create temp user (without password yet)
      user = await User.create({
        phone,
        authProvider: "phone",
        isVerified: false,
        otp,
        otpExpiry,
        name: "Temp", // will update later
        hasPassword: false
      });
    }

    //  TEMP SMS (for now)
    //console.log("PHONE OTP:", otp);

    //res.json({
      //success: true,
      //message: "OTP sent to phone (check console for now)",
    //});

    res.json({
  success: true,
  message: "OTP sent (Demo Mode)",
  otp, // 👈 VERY IMPORTANT
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// VERIFY PHONE OTP
// ==========================
export const verifyPhoneOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // OTP CHECK
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // VERIFY USER
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    const isNewUser = !user.hasPassword;
    res.json({
      success: true,
      message: "Phone verified successfully",
      isNewUser, // important flag
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// SET PASSWORD AFTER PHONE OTP
// ==========================
export const setPassword = async (req, res) => {
  try {
    const { phone, name, password, role } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.name = name;
    user.role = role || "user";
    user.hasPassword = true; // mark that user now has a real password

    await user.save();

    res.json({
      success: true,
      message: "Profile setup complete",
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};