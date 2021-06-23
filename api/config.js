const API_BASE_URL = process.env.API_BASE_URL;

const SIGNUP_URL = `${API_BASE_URL}/v1/auth/signup`;
const LOGIN_URL = `${API_BASE_URL}/v1/auth/login`;
const LOGIN_GOOGLE_URL = `${API_BASE_URL}/v1/auth/login/google`;
const VERIFY_ACCOUNT_URL = `${API_BASE_URL}/v1/auth/activate-account`;

export {
  API_BASE_URL,
  SIGNUP_URL,
  LOGIN_URL,
  LOGIN_GOOGLE_URL,
  VERIFY_ACCOUNT_URL,
};
