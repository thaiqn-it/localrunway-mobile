import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getAll = () => {
    return axios.get(API_URI + 'payments/');
}

export const paymentApi = {
    getAll,
};
