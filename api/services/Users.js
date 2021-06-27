import HTTPClient from "../HTTPClient";

export default class UserManagementRoutes {
  static async GetUserProfile(id) {
    return HTTPClient.get(`/users/${id}/profile`);
  }

  static async GetUsersPosts(id) {
    return HTTPClient.get(`/users/${id}/uploaded-posts`);
  }

  static async GetLikedPosts(id) {
    return HTTPClient.get(`/users/${id}/liked-posts`);
  }

  static async GetRepostedPosts(id) {
    return HTTPClient.get(`/users/${id}/reposted-posts`);
  }

  static async UpdateProfile(payload) {
    return HTTPClient.put(`/users/profile`, payload);
  }
}
