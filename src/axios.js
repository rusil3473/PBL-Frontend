import axios from "axios";
const apiUrl = process.env.URL;
export const Axios = axios.create({
  baseURL: apiUrl, // replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set true if using cookies/sessions
});
