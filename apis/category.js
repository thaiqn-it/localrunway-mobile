import { defaultInstance } from ".";

const getAll = () => {
    return defaultInstance.get('categories/');
}

const getOneById = (id) => {
    return defaultInstance.get('categories/' + id);
}

const createOne = () => {
    return defaultInstance.post('categories/');
}

const updateOne = (id) => {
    return defaultInstance.put('categories/' + id);
}

const deleteOne = (id) => {
    return defaultInstance.delete('categories/' + id);
}

export const categoryApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};