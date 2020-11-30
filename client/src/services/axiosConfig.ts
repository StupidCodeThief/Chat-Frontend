import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-cocket.herokuapp.com",
});

instance.defaults.headers["Content-Type"] = "application/json";

if (localStorage.token) {
  instance.defaults.headers.common["auth-token"] = localStorage.token;
} 
  instance.defaults.headers["auth-token"] = localStorage.token;
} else {
  delete instance.defaults.headers["auth-token"];
}

console.log(instance.defaults.headers)
export default instance;
