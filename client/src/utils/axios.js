import axios from "axios";

const URL = process.env.REACT_APP_URL;
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosInstance;
