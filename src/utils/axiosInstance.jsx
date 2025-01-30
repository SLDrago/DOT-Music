import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
// Import your decryption utility

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

const encryptData = (data) => {
  try {
    const stringData = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, "your-secret-key").toString();
  } catch (error) {
    console.error("Error during encryption:", error);
    return null;
  }
};

const decryptData = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "your-secret-key");
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    const encryptedToken = Cookies.get("authToken");
    if (encryptedToken) {
      const token = decryptData(encryptedToken);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to Handle Token Expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const encryptedRefreshToken = Cookies.get("refreshToken");
        if (encryptedRefreshToken) {
          const refreshToken = decryptData(encryptedRefreshToken);

          // Call the API to refresh the token
          const response = await axios.post(
            `${API_BASE_URL}/users/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );
          console.log(refreshToken);
          const { access } = response.data;

          // Store the new tokens
          Cookies.set("authToken", encryptData(access), {
            secure: true,
            expires: 1,
          });
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle logout or redirect to login
        Cookies.remove("authToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
