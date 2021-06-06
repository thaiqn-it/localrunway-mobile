import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + 'products/');
}

const getOneById = (id) => {
    return axios.get(API_URI + 'products/' + id);
}

const createOne = () => {
    return axios.post(API_URI + 'products/');
}

const updateOne = (id) => {
    return axios.put(API_URI + 'products/' + id);
}

const deleteOne = (id) => {
    return axios.delete(API_URI + 'products/' + id);
}

export const productApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};
