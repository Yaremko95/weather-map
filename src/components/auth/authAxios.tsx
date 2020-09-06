import axios from "axios";

import Cookies from "js-cookie";

const authAxios = axios.create({
  baseURL: "http://localhost:3008",
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log("!!!", error);

    if (
      error.response.status === 401 &&
      originalRequest.url === "users/token"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("retrying");
      const refreshToken = Cookies.get("refreshToken");
      return axios
        .post(
          `http://localhost:3008/users/token`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          console.log("response inside", res);
          if (res.status === 200) {
            return Promise.resolve(res);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default authAxios;
