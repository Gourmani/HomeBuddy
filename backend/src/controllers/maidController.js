import MaidProfile from "../models/MaidProfile.js";

// CREATE PROFILE
export const createProfile = async (req, res) => {
  try {

    // ✅ ROLE CHECK
    if (req.user.role !== "maid") {
      return res.status(403).json({ message: "Only maids can create profile" });
    }

    const existing = await MaidProfile.findOne({ user: req.user._id });

    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await MaidProfile.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL PROFILES (ADD THIS BACK)
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await MaidProfile.find().populate("user", "name email");

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};