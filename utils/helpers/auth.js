import clientCookies from "@utils/helpers/clientCookies";

const getUser = () => {
  const user = clientCookies.getCookie("user");
  return typeof user === "string" ? JSON.parse(user) : user;
};

const setUser = (user, options = {}) => {
  return clientCookies.setCookie("user", user, options);
};

const deleteUser = () => {
  return clientCookies.deleteCookie("user");
};

const getAccessToken = () => {
  return clientCookies.getCookie("access_token");
};

const setAccessToken = (token, options = {}) => {
  return clientCookies.setCookie("access_token", token, options);
};

const deleteAccessToken = () => {
  return clientCookies.deleteCookie("access_token");
};

const getRefreshToken = () => {
  return clientCookies.getCookie("refresh_token");
};

const setRefreshToken = (token, options = {}) => {
  return clientCookies.setCookie("refresh_token", token, options);
};

const deleteRefreshToken = () => {
  return clientCookies.deleteCookie("refresh_token");
};

export default {
  getUser,
  setUser,
  deleteUser,
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  getRefreshToken,
  setRefreshToken,
  deleteRefreshToken,
};
