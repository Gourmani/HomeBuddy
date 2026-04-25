import express from "express";

import {signup,login,verifyOTP,resendOTP,forgotPassword,resetPassword} from "../controllers/authController.js";
import { sendPhoneOTP, verifyPhoneOTP,setPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/send-phone-otp", sendPhoneOTP);
router.post("/verify-phone-otp", verifyPhoneOTP);
router.post("/set-password", setPassword);

export default router;