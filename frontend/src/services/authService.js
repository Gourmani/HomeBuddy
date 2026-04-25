    import API from "./api";

    export const signupUser = (data)=>
        API.post("/auth/signup",data);

    export const loginUser = (data)=>
        API.post("/auth/login",data);

    export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);