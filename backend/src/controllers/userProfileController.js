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

export const getMyUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      user: req.user._id,
    }).populate("user", "name email");

    //  return 404 if not found
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllUserProfiles = async (req, res) => {
  try {
    const maidProfile = await MaidProfile.findOne({
      user: req.user._id,
    });

    if (!maidProfile) {
      return res.status(404).json({
        message: "Maid profile not found",
      });
    }

    //  SAFE EXTRACTION
    const city = maidProfile.location?.city?.trim();
    const area = maidProfile.location?.area?.trim();
    const workArray = maidProfile.workType || [];

    if (!city || !area || workArray.length === 0) {
      return res.status(400).json({
        message: "Incomplete maid profile",
      });
    }

    // =========================
    // STEP 1: EXACT MATCH
    // =========================
    let profiles = await UserProfile.find({
      "location.city": { $regex: `^${city}$`, $options: "i" },
      "location.area": { $regex: `^${area}$`, $options: "i" },
      workRequired: { $in: workArray },
    }).populate("user", "name email");

    // =========================
    // STEP 2: SAME CITY + WORK
    // =========================
    if (profiles.length === 0) {
      profiles = await UserProfile.find({
        "location.city": { $regex: `^${city}$`, $options: "i" },
        workRequired: { $in: workArray },
      }).populate("user", "name email");
    }

    // =========================
    // STEP 3: SAME CITY ONLY
    // =========================
    if (profiles.length === 0) {
      profiles = await UserProfile.find({
        "location.city": { $regex: `^${city}$`, $options: "i" },
      }).populate("user", "name email");
    }

    res.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {
    console.error("USER MATCH ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};