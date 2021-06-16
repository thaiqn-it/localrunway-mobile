import { defaultInstance } from ".";

const getOneById = (id) => {
    return defaultInstance.get('localbrands/' + id);
}

export const localBrandApi = {
    getOneById,
};
