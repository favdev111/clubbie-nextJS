import { SIGNUP_URL, VERIFY_ACCOUNT_URL } from "./config";

const signup = (credentials) => {
  return new Promise((resolve, reject) => {
    fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code >= 400) {
          throw new Error(response.message);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

const verifyAccount = (token, credentials) => {
  return new Promise((resolve, reject) => {
    fetch(VERIFY_ACCOUNT_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code >= 400) {
          throw new Error(response.message);
        }
        resolve(response);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

module.exports = {
  signup,
  verifyAccount,
};
