import axios from "axios";
import getEnvVars from "../constants/env";
import { JWT_TOKEN, resetJWTToken } from "../constants";

const { API_URI } = getEnvVars();

const defaultInstance = axios.create({
  baseURL: API_URI,
});

resetJWTToken().then(token => {
  defaultInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
})

export { defaultInstance };

