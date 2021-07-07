import React, { createContext, useState,useEffect,useReducer } from "react";
import { customerApi } from "../api/customer";
import * as SecureStore from "expo-secure-store";

export const CustomerContext = createContext();

const getAddressFromLocal = async () => {
  const data = await SecureStore.getItemAsync("ADDRESS")
  if (data != null) {
    return JSON.parse(data)
  } else return []
}

const generateId = (address) => {
  const idIndex = Math.floor(Math.random() * 9999) + 1;
  if(address.find(id => id === idIndex)){
    idIndex = generateId(address)
  }
  return idIndex;
}

const addressReducer = (state,action) => {
  switch (action.type) {
      case "NEW_ADDRESS" : 
        const id = generateId(state.address);
        state.address.push({
          id : id,
          customerId : action.customerId,
          customer : action.customer,
          address : action.address,
          select : false,
        })
        return {
          ...state,
        }
      case "UPDATE" :
        return {
          ...state,
        }
      case "SELECT" :
        state.address.map(item => {
          if (item.id == action.selectedId) {
            item.select = true
          } else item.select = false
        })
        return {
          ...state,
        }
      case "LOAD" :
        state.address = action.data
        return {
          ...state
        } 
      case "DELETE" :
        const index = state.address.findIndex(item => item.id === action.id)
        state.address.splice(index,1)
        return {
          ...state,
        }   
  }
}

const customerReducer = (state,action) => {
    switch(action.type) {
      case "LOAD" : 
        state = action.data
        return {
          ...state,
        }
      case "CLEAR" :
        state = {}
        return {
          ...state
        }  
    }
}

export default function CustomerProvider({ children }) { 
    const [ customer,setCustomer ] = useReducer(customerReducer, {})
    const [ state,dispatch ] = useReducer(addressReducer,{
        address : []
    })  
    
    useEffect(() => {
      async function loadAddress () {
        const data = await getAddressFromLocal()
        dispatch({
          type : 'LOAD',
          data : data,
        })
      }     
      loadAddress()
    }, [])

    return (
      <CustomerContext.Provider
        value={{
          customer,
          state,
          dispatch,
          setCustomer,
        }}
      >
        {children}
      </CustomerContext.Provider>
    );
  }