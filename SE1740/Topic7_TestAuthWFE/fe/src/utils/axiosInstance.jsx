import axios from "axios";
import { BASE_URL } from "./constants";
import { jwtDecode } from "jwt-decode"; // Corrected the import statement for jwtDecode
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important to send cookies with requests
});

const refreshToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error("Session expired. Please sign in again");
    // window.location.href = "/signin";
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log("Token expired");
        const data = await refreshToken();
        if (data) {
          accessToken = data.accessToken;
          sessionStorage.setItem("accessToken", accessToken);
        } else {
          // window.location.href = "/signin";
        }
      }
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
