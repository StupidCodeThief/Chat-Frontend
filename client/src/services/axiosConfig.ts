import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.defaults.headers["Content-Type"] = "application/json";

if (localStorage.token) {
  instance.defaults.headers.common["auth-token"] = localStorage.token;
}

export default instance;
