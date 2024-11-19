import axios from "axios";

// const URL = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: "/api/v1", // Removed unnecessary double quotes
});

export default axiosInstance;
