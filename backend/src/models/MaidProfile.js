import mongoose from "mongoose";

const maidProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 🔥 UPDATED WORK TYPES
    workType: {
      type: [String],
      enum: [
        "cleaning",
        "cooking",
        "babysitting",
        "eldercare",
        "driver",
        "eventhelper",
        "all",
      ],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    salaryExpected: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔥 FIXED ENUM
    salaryType: {
      type: String,
      enum: ["monthly", "daily", "hourly", "weekly"],
      required: true,
    },

    // 🔥 LOCATION STRUCTURE (NO CHANGE NEEDED)
    location: {
      city: { type: String, required: true },
      area: { type: String, required: true },
      pincode: { type: String },
    },

    availability: {
      type: String,
      enum: ["full-time", "part-time", "hourly"],
      required: true,
    },

    profileImage: {
      type: String,
    },

    description: {
      type: String,
      maxlength: 300,
    },

    // 🔥 RATING SYSTEM
    avgRating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🔥 INDEXING (GOOD FOR PERFORMANCE)
maidProfileSchema.index({ "location.city": 1 });
maidProfileSchema.index({ "location.area": 1 });
maidProfileSchema.index({ workType: 1 });
maidProfileSchema.index({ salaryExpected: 1 });

export default mongoose.model("MaidProfile", maidProfileSchema);