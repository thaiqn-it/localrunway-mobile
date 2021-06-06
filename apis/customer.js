import axios from "axios";
import getEnvVars from "../config";

const { API_URI } = getEnvVars();


const getCustomer = () => {
    return axios.get(API_URI + '/customers/me'); 
}

const login = (phoneNumber,password) => {
    return axios.post(API_URI + '/customers/login',{
        phoneNumber : phoneNumber,
        password : password
    });
}

export const customerApi = {
    getCustomer,
    login,
};