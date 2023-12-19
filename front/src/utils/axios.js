import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post("http://localhost:3000/auth/refresh", {
      token: refreshToken,
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.message === "jwt expired") {
      localStorage.clear();
      location.reload();
    }
  }
};

const axiosInstance = axios.create({
  baseURL: "",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwtDecode(localStorage.getItem("accessToken"));

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      let data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data.accessToken;
      return config;
    } else {
      config.headers["authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
