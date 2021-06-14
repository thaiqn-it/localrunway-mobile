import { defaultInstance } from "./index";

const getLocalbrands = () => {
  return defaultInstance.get("/localbrands");
};

export const localbrandApi = {
  getLocalbrands,
};
