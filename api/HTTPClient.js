import Axios from "axios";
import router from "next/router";
import { API_BASE_URL } from "./config";

let baseURL = API_BASE_URL;

const client = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json, text/plain, */*",
  },
});

export default class HTTPClient {
  static async head(path) {
    return client.head(path);
  }

  static async get(path, params = {}, headers = {}) {
    return client.get(path, {
      params,
      headers,
    });
  }

  static async post(path, data = {}, headers = {}, onUploadProgress) {
    return client.post(path, data, {
      headers,
      onUploadProgress,
    });
  }

  static async patch(path, data = {}, headers = {}) {
    return client.patch(path, data, {
      headers,
    });
  }

  static async put(path, data = {}, headers = {}) {
    return client.put(path, data, {
      headers,
    });
  }

  static async delete(path, data = {}, headers = {}) {
    return client.delete(path, {
      data,
      headers,
    });
  }

  static setHeader(key, value) {
    client.defaults.headers.common[key] = value;
  }

  static setBaseURL(url) {
    client.defaults.baseURL = url;
  }
}

// middleware to check if user acc is activated
// check on client side
if (process.browser) {
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      // user's account is not activated
      if (error.response.status === 406) {
        router.push("/auth/account-verification");
      }
      return Promise.reject(error);
    }
  );
}
