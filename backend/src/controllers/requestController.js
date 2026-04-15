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

// ✅ UPDATE REQUEST STATUS (ACCEPT / REJECT)
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // only allow valid values
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.json({
      success: true,
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkRequestStatus = async (req, res) => {
  try {
    const { maidId } = req.params;

    const request = await Request.findOne({
      user: req.user._id,
      maid: maidId,
    }).sort({ createdAt: -1 }); // 🔥 FIX

    if (!request) {
      return res.json({ status: "none" });
    }

    res.json({ status: request.status });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestsForUser = async (req, res) => {
  try {
    const requests = await Request.find({
      user: req.user._id,
    })
      .populate({
        path: "maid",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};