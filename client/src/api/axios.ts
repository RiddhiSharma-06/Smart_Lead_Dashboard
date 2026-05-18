import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ADD TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;