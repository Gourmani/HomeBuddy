import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaidProfile",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔥 prevent duplicate review
reviewSchema.index({ user: 1, maid: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);