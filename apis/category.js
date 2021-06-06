import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + 'categories/');
}

const getOneById = (id) => {
    return axios.get(API_URI + 'categories/' + id);
}

const createOne = () => {
    return axios.post(API_URI + 'categories/');
}

const updateOne = (id) => {
    return axios.put(API_URI + 'categories/' + id);
}

const deleteOne = (id) => {
    return axios.delete(API_URI + 'categories/' + id);
}

export const categoryApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};