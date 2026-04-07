import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createProfile, getAllProfiles, getMaidById } from "../controllers/maidController.js";

const router = express.Router();

// CREATE PROFILE (only maid)
router.post("/", protect, createProfile);

// GET ALL PROFILES (with filters)
router.get("/", getAllProfiles);
router.get("/:id", getMaidById);

export default router;