import { LOGIN_GOOGLE_URL } from "./config";

const googleLogin = (credentials) => {
  return new Promise((resolve, reject) => {
    fetch(LOGIN_GOOGLE_URL, {
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

module.exports = {
  googleLogin,
};
