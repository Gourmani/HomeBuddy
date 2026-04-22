import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTPEmail } from "../services/emailService.js";

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for email service 
export const testEmail = async (req, res) => {
  try {
    await sendOTPEmail("raush6330@gmail.com", "123456");

    res.json({ message: "Email sent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error sending email" });
  }
};