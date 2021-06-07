import { defaultInstance } from ".";

const getAll = () => {
    return defaultInstance.get('localbrands/');
}

const getOneById = (id) => {
    return defaultInstance.get('localbrands/' + id);
}

const createOne = () => {
    return defaultInstance.post('localbrands/');
}

const updateOne = (id) => {
    return defaultInstance.put('localbrands/' + id);
}

const deleteOne = (id) => {
    return defaultInstance.delete('localbrands/' + id);
}

export const localBrandApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};
