import { defaultInstance } from ".";

const getAll = () => {
    return defaultInstance.get('payments/');
}

export const paymentApi = {
    getAll,
};
