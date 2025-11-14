import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://backend.gaurastra.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
export { BASE_URL };
