import MaidProfile from "../models/MaidProfile.js";
import UserProfile from "../models/UserProfile.js";

export const getMatchedMaids = async (req, res) => {
  try {
    // Only user allowed
    if (req.user.role !== "user") {
      return res.status(403).json({
        message: "Only users can access this",
      });
    }

    const userProfile = await UserProfile.findOne({
      user: req.user._id,
    });

    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    const city = userProfile.location?.city?.trim();
    const area = userProfile.location?.area?.trim();
    const workArray = userProfile.workRequired || [];

    if (!city || !area || workArray.length === 0) {
      return res.status(400).json({
        message: "Incomplete user profile",
      });
    }

    // =========================
    // STEP 1: EXACT MATCH
    // =========================
    let maids = await MaidProfile.find({
      "location.city": { $regex: `^${city}$`, $options: "i" },
      "location.area": { $regex: `^${area}$`, $options: "i" },
        workType: { $in: userProfile.workRequired },
    }).populate("user", "name email");

    // =========================
    // STEP 2: SAME CITY + WORK
    // =========================
    if (maids.length === 0) {
      maids = await MaidProfile.find({
        "location.city": { $regex: `^${city}$`, $options: "i" },
        workType: { $in: userProfile.workRequired },
      }).populate("user", "name email");
    }

    // =========================
    // STEP 3: SAME CITY ONLY
    // =========================
    if (maids.length === 0) {
      maids = await MaidProfile.find({
        "location.city": { $regex: `^${city}$`, $options: "i" },
      }).populate("user", "name email");
    }
    
    maids = maids.map((maid) => {
  const maidSkills = maid.workType || [];
  const userSkills = workArray;

  // count matches
  const matchCount = maidSkills.filter(skill =>
    userSkills.includes(skill)
  ).length;

  return {
    ...maid.toObject(),
    matchScore: matchCount,
  };
});

//  SORT BY BEST MATCH
maids.sort((a, b) => b.matchScore - a.matchScore);


    res.json({
      success: true,
      count: maids.length,
      data: maids,
    });

  } catch (error) {
    console.error("MATCH ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};