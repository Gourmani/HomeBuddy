import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/userController.js";
import { testEmail } from "../controllers/userController.js";

const router = express.Router(); // 🔥 IMPORTANT

//  CHANGE PASSWORD
router.put("/change-password", protect, changePassword);
router.get("/test-email", testEmail);

export default router;