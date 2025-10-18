import axios from "axios";
import { ENV } from "./ENV";

const api = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
