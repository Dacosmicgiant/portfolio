// // axios.js

// import axios from "axios";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL + "/api",
//   withCredentials: true,
// });

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
