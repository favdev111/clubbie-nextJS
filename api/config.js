const API_BASE_URL = "http://localhost:3001";

const SIGNUP_URL = `${API_BASE_URL}/v1/auth/signup`;
const LOGIN_URL = `${API_BASE_URL}/v1/auth/login`;
const VERIFY_ACCOUNT_URL = `${API_BASE_URL}/v1/auth/activate-account`;

export { 
    SIGNUP_URL, 
    LOGIN_URL, 
    VERIFY_ACCOUNT_URL 
};
