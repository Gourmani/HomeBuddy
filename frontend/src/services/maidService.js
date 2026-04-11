import API from "./api";

//  CREATE PROFILE (no change)
export const createMaidProfile = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return API.post("/maids", data, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

//  GET PROFILES WITH FILTERS (UPDATED)
export const getMaidProfiles = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return API.get(`/maids?${params}`);
};