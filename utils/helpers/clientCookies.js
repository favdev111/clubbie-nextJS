import Cookie from "js-cookie";

const config = {
  userCookieConfig: (userObj) => {
    const _userObj = { ...userObj };

    // delete fields to not store in cookie
    if (_userObj?.local?.password) delete _userObj.local.password;
    if (_userObj?.clubs) delete _userObj.clubs;
    if (_userObj?.teams) delete _userObj.teams;
    if (_userObj?.stripe?.customer?.paymentMethods)
      delete _userObj.stripe.customer.paymentMethods;

    return _userObj;
  },
};

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
  config,
  setCookie,
  getCookie,
  deleteCookie,
};
