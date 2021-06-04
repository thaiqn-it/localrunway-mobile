import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + '/');
}

const getOneById = (id) => {
    return axios.get(API_URI + '/' + id);
}

const createOne = () => {
    return axios.post(API_URI + '/');
}

const updateOne = (id) => {
    return axios.put(API_URI + '/' + id);
}

const deleteOne = (id) => {
    return axios.delete(API_URI + '/' + id);
}

export const productApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};
