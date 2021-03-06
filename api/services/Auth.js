import HTTPClient from "../HTTPClient";

export default class AuthManagementRoutes {
  static async SignUp(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }

  static async Login(payload) {
    return HTTPClient.post(`/auth/login`, payload);
  }

  static async GoogleLogin(payload) {
    return HTTPClient.post(`/auth/login/google`, payload);
  }

  static async FaceBookLogin(payload) {
    return HTTPClient.post(`/auth/login/facebook`, payload);
  }

  static async AppleLogin(payload) {
    return HTTPClient.post(`/auth/login/apple`, payload);
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

  static async ResendActivationCode(payload) {
    return HTTPClient.post(`/auth/resend-activate-account`, payload);
  }

  static async ForgotPassword(payload) {
    return HTTPClient.post(`/auth/forgot-password`, payload);
  }

  static async ResetPassword(payload) {
    return HTTPClient.patch(`/auth/reset-password`, payload);
  }

  static async StripeConnect(payload) {
    return HTTPClient.post(`/auth/stripe-connect`, payload);
  }

  static async StripeDisconnect() {
    return HTTPClient.delete(`/auth/stripe-remove`);
  }

  static async StripeDashboard() {
    return HTTPClient.get(`/auth/stripe-login-link`);
  }

  static async AddPaymentMethod(payload) {
    return HTTPClient.post(`/auth/payment-methods`, payload);
  }

  static async SetDefaultPaymentMethod(id) {
    return HTTPClient.patch(`/auth/payment-methods/${id}/set-default`);
  }

  static async RemovePaymentMethod(id) {
    return HTTPClient.delete(`/auth/payment-methods/${id}/remove`);
  }
}
