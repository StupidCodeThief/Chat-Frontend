import axiosConfig from "../services/axiosConfig";

const setAuthToken = (token: string | null): void => {
  if (token) {
    axiosConfig.defaults.headers.common["auth-token"] = token;
  } else {
    delete axiosConfig.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;
