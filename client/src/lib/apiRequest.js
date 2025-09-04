import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://furniture-backend-qz6g.onrender.com/api",
  withCredentials: true,

  
  // baseURL: "http://localhost:3000/api",
  // withCredentials: true,
});   

export default apiRequest;
