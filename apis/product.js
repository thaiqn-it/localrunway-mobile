import { defaultInstance } from ".";

const getAll = () => {
    return defaultInstance.get('products/');
}

const getOneById = (id) => {
    return defaultInstance.get('products/' + id);
}

const createOne = () => {
    return defaultInstance.post('products/');
}

const updateOne = (id) => {
    return defaultInstance.put('products/' + id);
}

const deleteOne = (id) => {
    return defaultInstance.delete('products/' + id);
}

export const productApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};
