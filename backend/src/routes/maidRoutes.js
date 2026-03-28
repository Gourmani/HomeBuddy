import express from "express";
import { createProfile, getAllProfiles } from "../controllers/maidController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProfile); // only logged-in users
router.get("/", getAllProfiles); // public

export default router;