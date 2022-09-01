const path = require("path");
const axios = require("axios");
let env = "local";
if (process.env.npm_config_dev) {
  env = "dev";
}

require("dotenv").config({
  path: path.join(__dirname, "../", "/.env." + env),
});

axios.defaults.baseURL = process.env.API_URL || "";

// request interceptor
axios.interceptors.request.use(
  (config) => {
    // do something before request is sent
    config.headers["Authorization"] = process.env.TOKEN;
    if (config.method == "post") {
      console.log("Post url:", config.baseURL + config.url);
      console.log("Post data:", config.data);
    }
    if (config.method == "get") {
      console.log("Get url:", config.baseURL + config.url);
      console.log("Get Params:", config.params);
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      console.log("Error:", response.status, res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("" + error); // for debug
    return Promise.reject(error);
  }
);

module.exports = axios;

