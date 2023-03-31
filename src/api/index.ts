import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const defaultInstance = () =>
  axios.create({
    baseURL: BASE_URL,
  });

const authInstance = (options?: any) => {
  const token = "token";
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer${token}`,
      ...options,
    },
  });
};

export const interceptedApi = defaultInstance().interceptors.request.use(
  (config) => {
    config.baseURL += "/posts";
    return config;
  }
);

export const defaultApi = defaultInstance();
export const authApi = authInstance();
