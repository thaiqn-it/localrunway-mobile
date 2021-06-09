import axios from "axios";
import getEnvVars from "../constants";

const { API_URI } = getEnvVars();

const defaultInstance = axios.create({
  baseURL: API_URI,
});

export { defaultInstance };
