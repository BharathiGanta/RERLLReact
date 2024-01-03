import inbuiltAxios from "axios";

const axios = inbuiltAxios.create({
  withCredentials: true, // Set to true to include credentials for all requests, this is needed for cookie
});

export default axios;
