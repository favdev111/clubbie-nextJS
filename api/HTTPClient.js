import Axios from "axios";
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
