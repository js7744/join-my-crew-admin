import axios from "axios";
import * as config from "../common";

const APIRequest = async ({ url, method }, data, params) => {
  const apiurl = `${process.env.REACT_APP_API_ENDPOINT}${url}`;

  try {
    let token = config.getSessionToken();

    let payload = {
      url: apiurl,
      method,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (params) payload.params = params;
    if (data) payload.data = data;
    return await axios(payload);
  } catch (error) {
    // if (error && error?.response?.status === 401 && url !== login.url)
    //   return config.logout();
    console.log("============= error =============", error);
    return { error: error?.response?.data ?? { message: "Server is unreachable" } };
  }
};

export default APIRequest;
