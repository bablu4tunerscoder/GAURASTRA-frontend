import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9090";

// Normal instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Helper to get offline token
const getOfflineAccessToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("offline_access_token");
  }
  return null;
};

// Instance WITH offline token
export const axiosInstanceWithOfflineToken = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Interceptor to attach offline_access_token
axiosInstanceWithOfflineToken.interceptors.request.use(
  (config) => {
    const token = getOfflineAccessToken();
    if (token) {
      // Use Authorization header instead of custom header to avoid CORS preflight issues
      config.headers.Authorization = `Bearer ${token}`;
      // OR if your backend specifically expects this header:
      // config.headers["offline-access-token"] = token; // Use kebab-case, not snake_case
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;