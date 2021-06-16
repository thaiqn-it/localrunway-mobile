import { defaultInstance } from ".";

const getOneById = (id) => {
    return defaultInstance.get(`localbrands/${id}`);
}

const getAll = () => {
    return defaultInstance.get("/localbrands");
};

export const localBrandApi = {
    getOneById,
    getAll
};
