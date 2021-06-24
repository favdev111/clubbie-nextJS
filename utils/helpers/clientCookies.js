import Cookie from "js-cookie";

const setCookie = (key, value, options = {}) => {
  return Cookie.set(key, value, options);
};

const getCookie = (key) => {
  return Cookie.get(key);
};

const deleteCookie = (key) => {
  return Cookie.remove(key);
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
};
