import API from "./api";

export const createMaidProfile = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return API.post("/maids", data, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const getMaidProfiles = () => {
  return API.get("/maids");
};