import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();

const getCustomer = () => {
    return axios.get(API_URI + '/me'); 
}

const login = () => {
    return axios.post(API_URI + '/login');
}

export const customerApi = {
    getCustomer,
    login,
};