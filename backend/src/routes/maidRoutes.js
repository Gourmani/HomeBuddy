import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProfile,
  getAllProfiles,
  getMaidById,
  updateProfile,
  getMyProfile,
} from "../controllers/maidController.js";

const router = express.Router();

// CREATE PROFILE
router.post("/", protect, createProfile);

//  VERY IMPORTANT → PUT THIS FIRST
router.get("/my-profile", protect, getMyProfile);

// GET ALL
router.get("/", getAllProfiles);

//  ALWAYS LAST
router.get("/:id", getMaidById);

// UPDATE
router.put("/", protect, updateProfile);

export default router;