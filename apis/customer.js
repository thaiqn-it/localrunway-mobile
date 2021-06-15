import { defaultInstance } from "../api/index"

const getCustomer = () => {
    return defaultInstance.get(`/customers/me`); 
}

const login = (phoneNumber,password) => {
    return defaultInstance.post(`/customers/login`,{
        phoneNumber : phoneNumber,
        password : password
    });
}

export const customerApi = {
    getCustomer,
    login,
};