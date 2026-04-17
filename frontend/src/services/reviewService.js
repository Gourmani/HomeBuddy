import API from "./api";

export const createReview = (data) => {
  return API.post("/reviews", data);
};

export const getReviews = (maidId) => {
  return API.get(`/reviews/${maidId}`);
};