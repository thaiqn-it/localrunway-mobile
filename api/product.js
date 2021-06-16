import { defaultInstance } from "./index";

const search = ({ ...data }) => {
  return defaultInstance.get("/products", {
    params: {
      ...data,
    },
  });
};

const getOneById = (id) => {
  return defaultInstance.get('products/' + id);
}

export const productApi = { 
      search,
      getOneById,
     };
