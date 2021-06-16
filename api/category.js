import { defaultInstance } from ".";

const getOneById = (id) => {
    return defaultInstance.get('categories/' + id);
}

export const categoryApi = {
    getOneById,
};
