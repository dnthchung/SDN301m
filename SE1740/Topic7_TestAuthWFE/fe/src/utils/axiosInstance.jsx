import axios from "axios";
import { BASE_URL } from "./constants";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { UserContext } from "../App";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      let date = new Date();
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log("Token expired");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("accessToken");
        // setUserAuth({ accessToken: null, user: null });
        toast.error("Session expired. Please sign in again");
        window.location.href = "/signin";
      }
      config.headers["token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
