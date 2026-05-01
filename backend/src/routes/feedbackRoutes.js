import express from "express";
import {
  createFeedback,
  getAllFeedback,
  updateFeedbackStatus,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

// User
router.post("/", createFeedback);

// ADMIN
router.get("/", getAllFeedback);
router.patch("/:id", updateFeedbackStatus);
router.delete("/:id", deleteFeedback);

export default router;