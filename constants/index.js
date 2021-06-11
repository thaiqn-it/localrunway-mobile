export const JWT_TOKEN_KEY = "JWT_TOKEN";
import * as SecureStore from "expo-secure-store";

export let JWT_TOKEN = "";

export const resetJWTToken = async () => {
  return (JWT_TOKEN = await SecureStore.getItemAsync(JWT_TOKEN_KEY));
};
