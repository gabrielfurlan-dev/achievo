import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5184"
})

export default api
