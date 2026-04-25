import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      city: { type: String, required: true },
      area: { type: String, required: true },
    },

    workRequired: {
      type: [String],
      enum: [
        "cleaning",
        "cooking",
        "babysitting",
        "eldercare",
        "driver",
        "eventhelper",
      ],
      required: true,
    },

    budget: {
      type: Number,
    },

    description: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);