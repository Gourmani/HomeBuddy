import Request from "../models/Request.js";

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