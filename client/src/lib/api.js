// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if using cookies/auth
});

export default api;


// THIS COMPONENT IS NOT USED I  KNOW :) TILL NOW
