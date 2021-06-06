import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + 'localbrands/');
}

const getOneById = (id) => {
    return axios.get(API_URI + 'localbrands/' + id);
}

const createOne = () => {
    return axios.post(API_URI + 'localbrands/');
}

const updateOne = (id) => {
    return axios.put(API_URI + 'localbrands/' + id);
}

const deleteOne = (id) => {
    return axios.delete(API_URI + 'localbrands/' + id);
}

export const localBrandApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};
