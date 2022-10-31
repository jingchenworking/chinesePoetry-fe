import axios from "axios";

export default axios.create({
  baseURL: "http://18.166.53.211:8080/api",
  // baseURL: "http://127.0.0.1:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});