import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://https://petstore-backend-2.onrender.com/api",
});

export default api;