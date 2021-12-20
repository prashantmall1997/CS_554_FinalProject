import axios from "axios";
import { store } from "./../../store";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 100000,
});

apiClient.interceptors.request.use(function (config) {
  if (config.url === "/users/readByEmail" || config.url === "/users/create") {
    return config;
  } else {
    const token = store.getState().login[0];
    config.headers.Authorization = `Bearer ${token.firebaseToken}`;
    return config;
  }
});

export default apiClient;
