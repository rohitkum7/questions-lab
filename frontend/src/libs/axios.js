// import axios from "axios";
// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === "development"
//       ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
//       : `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`,
//   withCredentials: true,
// });

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api/v1"
      : "/api/v1",
  withCredentials: true,
});
