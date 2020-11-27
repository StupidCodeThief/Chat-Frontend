import axios from "axios";

const setAxiosHeders = (): void => {
  axios.defaults.headers["Content-Type"] = "application/json";
};

export default setAxiosHeders;
