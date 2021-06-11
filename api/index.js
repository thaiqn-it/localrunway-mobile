import axios from "axios";
import getEnvVars from "../constants/env";
import { JWT_TOKEN, resetJWTToken } from "../constants";

const { API_URI } = getEnvVars();

const defaultInstance = axios.create({
  baseURL: API_URI,
});

defaultInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${resetJWTToken()}`;

export { defaultInstance };
