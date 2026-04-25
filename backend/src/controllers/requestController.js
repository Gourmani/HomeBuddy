import Request from "../models/Request.js";
import MaidProfile from "../models/MaidProfile.js";
import User from "../models/User.js";
import {
  sendRequestEmail,
  sendStatusEmail,
} from "../services/emailService.js";

// ==========================
// CREATE REQUEST
// ==========================
export const createRequest = async (req, res) => {
  try {
    const { maidId } = req.body;

    // CHECK DUPLICATE
    const existing = await Request.findOne({
      user: req.user._id,
      maid: maidId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    // CREATE REQUEST
    const request = await Request.create({
      user: req.user._id,
      maid: maidId,
    });

    //  SEND EMAIL TO MAID
    const maidProfile = await MaidProfile.findById(maidId).populate("user");
    const user = await User.findById(req.user._id);

    if (maidProfile?.user?.email) {
      await sendRequestEmail(
        maidProfile.user.email,
        user.name
      );
    }

    res.status(201).json({
      success: true,
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET REQUESTS FOR MAID
// ==========================
export const getRequestsForMaid = async (req, res) => {
  try {
    const maidProfile = await MaidProfile.findOne({
      user: req.user._id,
    });

    if (!maidProfile) {
      return res.status(404).json({ message: "Maid profile not found" });
    }

    const requests = await Request.find({
      maid: maidProfile._id,
    }).populate("user", "name email");

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// UPDATE REQUEST STATUS
// ==========================
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    //  SEND EMAIL TO USER
    const user = await User.findById(request.user);
    const maidProfile = await MaidProfile.findById(request.maid).populate("user");

    if (user?.email) {
      await sendStatusEmail(
        user.email,
        maidProfile.user.name,
        status
      );
    }

    res.json({
      success: true,
      data: request,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// CHECK REQUEST STATUS
// ==========================
export const checkRequestStatus = async (req, res) => {
  try {
    const { maidId } = req.params;

    const request = await Request.findOne({
      user: req.user._id,
      maid: maidId,
    }).sort({ createdAt: -1 });

    if (!request) {
      return res.json({ status: "none" });
    }

    res.json({ status: request.status });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// GET REQUESTS FOR USER
// ==========================
export const getRequestsForUser = async (req, res) => {
  try {
    const requests = await Request.find({
      user: req.user._id,
    }).populate({
      path: "maid",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};