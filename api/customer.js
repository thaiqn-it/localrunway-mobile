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
const register = (user) => {
  return defaultInstance.post("/customers/register", user);
};

const getCustomer = () => {
  return defaultInstance.get("/customers/me");
};

const updateCustomer = (customer) => {
    return defaultInstance.put("/customers/me",customer)
};

const changePassword = (password,newPassword) => {
    return defaultInstance.put("/customers/resetPassword",{
        password,
        newPassword,
    })
};

export const customerApi = {
  login,
  loginWithFacebook,
  register,
  getCustomer,
  updateCustomer,
  changePassword,
};
