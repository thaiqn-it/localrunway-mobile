import { defaultInstance } from "./index";

const login = (phoneNumber, password) => {
  return defaultInstance.post("/customers/login", {
    phoneNumber,
    password,
  });
};

const loginWithFacebook = ({ access_token, ...data }) => {
  return defaultInstance.post("/customers/fbLogin", {
    access_token,
  });
};

export const customerApi = {
  login,
  loginWithFacebook,
};
