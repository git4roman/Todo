import axios from "axios";

const URL = process.env.REACT_APP_URL;
const axiosInstance = axios.create({
  baseURL: "",
});

export default axiosInstance;
