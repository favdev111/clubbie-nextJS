import HTTPClient from "../HTTPClient";

export default class AuthManagementRoutes {
  static async SignUp(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }

  static async Login(payload) {
    return HTTPClient.post(`/auth/login`, payload);
  }

  static async Logout(payload) {
    return HTTPClient.post(`/auth/logout`, payload);
  }

  static async ActivateAccount(payload) {
    return HTTPClient.patch(`/auth/activate-account`, payload);
  }

  static async RefreshTokens(payload) {
    return HTTPClient.post(`/auth/refresh-tokens`, payload);
  }
}
