import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + 'hashtags/');
}

const getOneById = (id) => {
    return axios.get(API_URI + 'hashtags/' + id);
}

const createOne = () => {
    return axios.post(API_URI + 'hashtags/');
}

const updateOne = (id) => {
    return axios.put(API_URI + 'hashtags/' + id);
}

const deleteOne = (id) => {
    return axios.delete(API_URI + 'hashtags/' + id);
}

export const hashtagApi = {
    getAll,
    getOneById,
    createOne,
    deleteOne,
    updateOne,
};