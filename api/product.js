import { defaultInstance } from "./index";

const search = ({ ...data }) => {
  return defaultInstance.get("/products", {
    params: {
      ...data,
    },
  });
};

export const productApi = { search };
