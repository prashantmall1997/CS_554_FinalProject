import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 1000
});

export default apiClient;
