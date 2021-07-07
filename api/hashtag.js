import { defaultInstance } from ".";

const getAll = () => {
  return defaultInstance.get("hashtags/");
};

export const hashtagApi = {
  getAll,
};
