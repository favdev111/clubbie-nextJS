import Axios from "axios";
import router from "next/router";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
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

// middleware/s on client side
if (process.browser) {
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalReq = error.config;
      // refresh token if expired
      if (error.response.status === 401 && !originalReq.retryAttempt) {
        const refreshToken = authUser.getRefreshToken();
        let tokens = null;

        // refresh request
        const response = await Auth.RefreshTokens({
          refreshToken: refreshToken,
        }).catch(() => null);

        // require login if failed to refresh token
        if (!response) {
          router.push("/auth/login");
          return Promise.reject(error);
        }

        // set token from response
        tokens = response?.data;

        // update cookies
        authUser.setAccessToken(tokens?.access?.token, {
          expires: new Date(tokens?.access?.expiry),
        });
        authUser.setRefreshToken(tokens?.refresh?.token, {
          expires: new Date(tokens?.refresh?.expiry),
        });

        // update axios header for current instance
        await HTTPClient.setHeader(
          "Authorization",
          `Bearer ${tokens?.access?.token}`
        );

        // update header for current request
        originalReq.headers.Authorization = `Bearer ${tokens?.access?.token}`;
        originalReq.retryAttempt = true;

        // retry request
        return client(originalReq);
      }
      // verify user account activation status | 406 not activated
      if (error.response.status === 406) {
        router.push("/auth/account-verification");
      }
      return Promise.reject(error);
    }
  );
}
