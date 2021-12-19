import axios from "axios";
import { store } from "./../../store";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 5000,
});

apiClient.interceptors.request.use(function (config) {
  console.log(config.url);
  if (config.url === "/users/readByEmail" || config.url === "/users/create") {
    return config;
  } else {
    const token = store.getState().login[0];
    console.log(token.firebaseToken);
    config.headers.Authorization = token;
    return config;
  }
});

export default apiClient;
