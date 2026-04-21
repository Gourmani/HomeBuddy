import UserProfile from "../models/UserProfile.js";
import MaidProfile from "../models/MaidProfile.js"; // 🔥 ADD THIS IMPORT

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
    }).populate("user", "name email"); // ✅ FIX

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET ALL USER PROFILES (SMART MATCHING)
export const getAllUserProfiles = async (req, res) => {
  try {
    // 🔥 1. Get maid profile
    const maidProfile = await MaidProfile.findOne({
      user: req.user._id,
    });

    if (!maidProfile) {
      return res.status(404).json({
        message: "Maid profile not found",
      });
    }

    // 🔥 2. Build matching query
    const query = {
      "location.city": maidProfile.location?.city,
      "location.area": maidProfile.location?.area,
      workRequired: maidProfile.workType,
    };

    // 🔥 3. Fetch filtered users
    const profiles = await UserProfile.find(query)
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