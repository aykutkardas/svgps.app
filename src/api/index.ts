import axios from "axios";

const getSessionToken = () => {
  if (typeof localStorage === "undefined") return null;

  try {
    return JSON.parse(localStorage.session || "{}")?.token ?? null;
  } catch {
    return null;
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Read the session on every request instead of once at import time, so a
// login or logout is picked up without a full page reload.
api.interceptors.request.use((config) => {
  config.headers.set("session", getSessionToken());
  return config;
});

export default api;
