import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  upsertUserProfile,getMyUserProfile,getAllUserProfiles} from "../controllers/userProfileController.js";

const router = express.Router();

router.post("/", protect, upsertUserProfile);
router.get("/me", protect, getMyUserProfile);
router.get("/", protect, getAllUserProfiles);

export default router;