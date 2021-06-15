import { defaultInstance } from "./index";

const login = (phoneNumber, password) => {
  return defaultInstance.post("/customers/login", {
    phoneNumber,
    password,
  });
};

export const customerApi = {
  login,
};
