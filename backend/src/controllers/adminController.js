import User from "../models/User.js";
import MaidProfile from "../models/MaidProfile.js";
import UserProfile from "../models/UserProfile.js";

//  STATS
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalMaids = await User.countDocuments({ role: "maid" });

    const totalProfiles = await UserProfile.countDocuments();

    res.json({
      totalUsers,
      totalMaids,
      totalProfiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    // attach profile data
    const usersWithProfile = await Promise.all(
      users.map(async (user) => {
        const profile = await UserProfile.findOne({ user: user._id });

        return {
          ...user.toObject(),
          profile,
        };
      })
    );

    res.json(usersWithProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ALL MAIDS
export const getMaids = async (req, res) => {
  try {
    const maids = await MaidProfile.find().populate("user", "-password");
    res.json(maids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  ANALYTICS
export const getAnalytics = async (req, res) => {
  try {
    // work demand
    const workDemand = await MaidProfile.aggregate([
      { $unwind: "$workType" },
      { $group: { _id: "$workType", count: { $sum: 1 } } },
    ]);

    // city demand
    const cityDemand = await MaidProfile.aggregate([
      {
        $group: {
          _id: "$location.city",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      workDemand,
      cityDemand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMaid = async (req, res) => {
  try {
    const maid = await MaidProfile.findById(req.params.id);

    if (!maid) {
      return res.status(404).json({ message: "Maid not found" });
    }

    await maid.deleteOne();

    res.json({ message: "Maid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};