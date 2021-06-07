import { defaultInstance } from ".";

const getAll = () => {
    return defaultInstance.get(`hashtags/`);
}

const getOneById = (id) => {
    return defaultInstance.get(`hashtags/` + id);
}

const createOne = () => {
    return defaultInstance.post(`hashtags/`);
}

const updateOne = (id) => {
    return defaultInstance.put(`hashtags/` + id);
}

const deleteOne = (id) => {
    return defaultInstance.delete(`hashtags/` + id);
}

export const hashtagApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};