import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,       // example: https://yourdomain.com
  withCredentials: true,
});

export default axiosInstance;
