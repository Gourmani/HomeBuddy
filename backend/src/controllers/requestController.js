import Request from "../models/Request.js";
import MaidProfile from "../models/MaidProfile.js";

//  CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const { maidId } = req.body;

    const request = await Request.create({
      user: req.user._id,
      maid: maidId,
    });

    res.status(201).json({
      success: true,
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  GET REQUESTS FOR LOGGED-IN MAID
export const getRequestsForMaid = async (req, res) => {
  try {
    // Step 1: find maid profile of logged-in user
    const maidProfile = await MaidProfile.findOne({ user: req.user._id });

    if (!maidProfile) {
      return res.status(404).json({ message: "Maid profile not found" });
    }

    // Step 2: find requests for this maid
    const requests = await Request.find({ maid: maidProfile._id })
      .populate("user", "name email");

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};