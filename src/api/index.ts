import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    session:
      typeof localStorage !== "undefined"
        ? JSON.parse(localStorage?.session || "{}")?.token
        : null,
  },
});

export default api;
