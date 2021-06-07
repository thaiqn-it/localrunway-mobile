import axios from "axios";
import { configs } from "../config";


const { API_URI } = configs.getEnvVars();
const { TOKEN_ID } = configs.getTokenID();

const defaultInstance = axios.create({
  baseURL: API_URI,
  headers: {
    'Authorization': TOKEN_ID
  }
});

export { defaultInstance };
