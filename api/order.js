import { defaultInstance } from ".";

const createOrder = (order) => {
    return defaultInstance.post("/orders",order)
}

const createOrderDetail = (productId,quantity,id) => {
    return defaultInstance.post(`/orders/${id}/orderdetails`,{
        productId,
        quantity,
    });
}

const getAll = () => {
    return defaultInstance.get('/orders');
}

const getOrderDetail = (id) => {
    return defaultInstance.get('/orders/' + id)
}

export const orderApi = {
    createOrder,
    createOrderDetail,
    getAll,
    getOrderDetail,
};