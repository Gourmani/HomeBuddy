import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createReview,
  getReviewsByMaid,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/:maidId", getReviewsByMaid);

export default router;