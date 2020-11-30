import axiosConfig from "../services/axiosConfig";

const setAuthToken = (token: string | null): void => {
  if (token) {
    axiosConfig.defaults.headers["auth-token"] = token;
  } else {
      delete axiosConfig.defaults.headers["auth-token"]
  }
};

export default setAuthToken;