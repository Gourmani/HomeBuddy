import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    type: {
      type: String,
      enum: ["bug", "suggestion", "general"],
      default: "general",
    },

    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);