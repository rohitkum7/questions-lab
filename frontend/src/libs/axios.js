import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    // Check for "development" (lowercase) mode as set by Vite
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` // Corrected variable name: VITE_API_BASE_URL
      : `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`, // Use VITE_API_BASE_URL for production too, with a fallback for empty string
  withCredentials: true,
});
