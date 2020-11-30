import axiosConfig from "../services/axiosConfig";

const setAxiosHeders = (): void => {
  axiosConfig.defaults.headers["Content-Type"] = "application/json";
};

export default setAxiosHeders;
