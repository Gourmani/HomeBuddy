import Feedback from "../models/Feedback.js";
import asyncHandler from "../middleware/asyncHandler.js";


//  CREATE FEEDBACK
export const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, message, type } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const feedback = await Feedback.create({
    name,
    email,
    message,
    type,
  });

  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    data: feedback,
  });
});


//  GET ALL FEEDBACK (ADMIN)
export const getAllFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    count: feedbacks.length,
    data: feedbacks,
  });
});


//  UPDATE STATUS (ADMIN)
export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: "Feedback not found",
    });
  }

  feedback.status = status;
  await feedback.save();

  res.json({
    success: true,
    message: "Status updated",
    data: feedback,
  });
});


//  DELETE FEEDBACK
export const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findByIdAndDelete(id);

  if (!feedback) {
    return res.status(404).json({
      success: false,
      message: "Feedback not found",
    });
  }

  res.json({
    success: true,
    message: "Feedback deleted",
  });
});
