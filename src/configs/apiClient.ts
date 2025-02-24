import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api", // Base URL serverless functions
  headers: {
    "Content-Type": "application/json",
  },
});
