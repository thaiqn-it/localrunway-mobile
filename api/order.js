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

export const orderApi = {
    createOrder,
    createOrderDetail,
};