import mongoose from "mongoose";

const maidProfileSchema = new mongoose.Schema(
  {
      name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ✅ one profile per user
    },

    workType: {
      type: String,
      enum: ["cleaning", "cooking", "babysitting", "all"],
      required: true,
    },

    experience: {
      type: Number, // in years
      required: true,
      min: 0,
    },

    salaryExpected: {
      type: Number,
      required: true,
      min: 0,
    },

    salaryType: {
      type: String,
      enum: ["monthly", "daily", "hourly"],
      required: true,
    },

    location: {
      city: { type: String },
      area: { type: String },
      pincode: { type: String },
    },

    availability: {
      type: String,
      enum: ["full-time", "part-time", "hourly"],
      required: true,
    },

    profileImage: {
      type: String, // URL (for now)
    },

    description: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MaidProfile", maidProfileSchema);