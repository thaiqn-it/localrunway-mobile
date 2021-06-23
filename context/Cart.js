import React, { createContext, useState, useReducer } from "react";

export const CartContext = createContext();

const itemProcessReducer = (state, action) => {
  let type = "";
  if (action.type === "DELETE_ITEM") {
    type = "DELETE_ITEM";
  } else {
    const checkExist =
      state.item.findIndex(
        (item) => item.product._id === action.item.product._id
      ) !== -1;
    !checkExist ? (type = "ADD_TO_CART") : (type = "UPDATE_ITEM");
  }

  switch (type) {
    case "ADD_TO_CART":
      state.item = state.item.concat(action.item);
      return {
        ...state,
      };
    case "UPDATE_ITEM":
      const product = state.item.find(
        (item) => item.product._id === action.item.product._id
      );
      if (action.type === "INCREASE") {
        product.quantity += 1;
      } else product.quantity = action.item.quantity;
      return {
        ...state,
      };
    case "DELETE_ITEM":
      action.item.item.map((id) => {
        state.item.splice(
          state.item.findIndex((item) => item.product._id === id),
          1
        );
      });
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

const itemSelectReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ALL":
      state.item = action.item;
      return {
        ...state,
      };
    case "REMOVE":
      state.item = [];
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(itemProcessReducer, {
    item: [],
  });
  const [isSelect, setSelect] = useReducer(itemSelectReducer, {
    item: [],
  });
  const getTotalPrice = () => {
    let totalPrice = 0;
    state.item.map((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };
  const getTotalItems = () => {
    let total = 0;
    state.item.forEach((x) => {
      total += x.quantity ?? 0;
    });
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        isSelect,
        setSelect,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
