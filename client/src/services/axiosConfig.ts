import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-cocket.herokuapp.com/",
});

instance.defaults.headers["Content-Type"] = "application/json";

if (localStorage.token) {
  axios.defaults.headers.common["auth-token"] = localStorage.token;
  console.log(axios.defaults.headers);
} else {
  delete axios.defaults.headers.common["auth-token"];
}

export default instance;
