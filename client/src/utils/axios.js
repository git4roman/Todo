import axios from "axios";

const URL = process.env.REACT_APP_URL;
const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "https://todo-demo-alpha.vercel.app"
=======
  baseURL:  "https://todo-demo-alpha.vercel.app",
>>>>>>> 23529584b73585faebc796fe97ac313ba0c2b9ab
});

export default axiosInstance;
