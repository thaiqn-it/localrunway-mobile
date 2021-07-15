import { defaultInstance } from "./index";

const search = ({ ...data }) => {
  return defaultInstance.get("/products", {
    params: {
      ...data,
    },
  });
};

const getOneById = (id, { ...data } = {}) => {
  return defaultInstance.get("products/" + id, data);
};

export const productApi = {
  search,
  getOneById,
};
