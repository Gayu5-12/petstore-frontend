import axios from "axios";

const api = axios.create({
  baseURL: "https://petstore-backend-2.onrender.com/api",
});

export default api;