import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-cocket.herokuapp.com",
});

instance.defaults.headers["Content-Type"] = "application/json";

if (localStorage.token) {
  instance.defaults.headers.common["auth-token"] = localStorage.token;
}

export default instance;
