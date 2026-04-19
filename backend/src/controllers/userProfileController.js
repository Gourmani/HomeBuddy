import UserProfile from "../models/UserProfile.js";

// CREATE OR UPDATE PROFILE
export const upsertUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body, user: req.user._id },
      { upsert: true, returnDocument: "after" }
    );

    res.json({
      success: true,
      data: profile,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY PROFILE
export const getMyUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      user: req.user._id,
    });

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL USER PROFILES (for maid)
export const getAllUserProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find()
      .populate("user", "name email");

    res.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};