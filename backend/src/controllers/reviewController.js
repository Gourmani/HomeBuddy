import Review from "../models/Review.js";
import Request from "../models/Request.js";
import MaidProfile from "../models/MaidProfile.js"; 

//  CREATE REVIEW (RESTRICTED + AVG RATING)
export const createReview = async (req, res) => {
  try {
    const { maidId, rating, comment } = req.body;

    //  1. CHECK: user had an accepted request
    const request = await Request.findOne({
      user: req.user._id,
      maid: maidId,
      status: "accepted",
    });

    if (!request) {
      return res.status(400).json({
        message: "You can only review after hiring this maid",
      });
    }

    //  2. PREVENT DUPLICATE REVIEW
    const existingReview = await Review.findOne({
      user: req.user._id,
      maid: maidId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this maid",
      });
    }

    //  3. CREATE REVIEW
    const review = await Review.create({
      user: req.user._id,
      maid: maidId,
      rating,
      comment,
    });

    //  4. UPDATE AVG RATING 
    const maid = await MaidProfile.findById(maidId);

    const totalRating =
      maid.avgRating * maid.numReviews + rating;

    maid.numReviews += 1;
    maid.avgRating = totalRating / maid.numReviews;

    await maid.save();

    res.status(201).json({
      success: true,
      data: review,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS OF MAID (NO CHANGE)
export const getReviewsByMaid = async (req, res) => {
  try {
    const { maidId } = req.params;

    const reviews = await Review.find({ maid: maidId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};