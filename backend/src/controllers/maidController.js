import MaidProfile from "../models/MaidProfile.js";

// ✅ CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
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

// ✅ GET ALL PROFILES WITH SEARCH + FILTER
export const getAllProfiles = async (req, res) => {
  try {
    const {
      search,
      workType,
      availability,
      city,
      area,
      pincode,
      minSalary,
      maxSalary,
      minExperience,
      maxExperience,
    } = req.query;

    let query = {};

    // 🔍 SEARCH
    if (search) {
      query.$and = query.$and || [];

      query.$and.push({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { workType: { $regex: search, $options: "i" } },
        ],
      });
    }

    // 🧹 Work Type
    if (workType) {
      query.workType = workType;
    }

    // ⏰ Availability
    if (availability) {
      query.availability = availability;
    }

    // 📍 Location
    if (city) {
      query["location.city"] = { $regex: city, $options: "i" };
    }

    if (area) {
      query["location.area"] = { $regex: area, $options: "i" };
    }

    if (pincode) {
      query["location.pincode"] = pincode;
    }

    // 💰 Salary
    if (minSalary || maxSalary) {
      query.salaryExpected = {};
      if (minSalary) query.salaryExpected.$gte = Number(minSalary);
      if (maxSalary) query.salaryExpected.$lte = Number(maxSalary);
    }

    // 📊 Experience
    if (minExperience || maxExperience) {
      query.experience = {};
      if (minExperience) query.experience.$gte = Number(minExperience);
      if (maxExperience) query.experience.$lte = Number(maxExperience);
    }

    const profiles = await MaidProfile.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE MAID PROFILE (SEPARATE FUNCTION)
export const getMaidById = async (req, res) => {
  try {
    const { id } = req.params;

    const maid = await MaidProfile.findById(id)
      .populate("user", "name email");

    if (!maid) {
      return res.status(404).json({ message: "Maid not found" });
    }

    res.json({
      success: true,
      data: maid,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};