import HTTPClient from "../HTTPClient";

export default class UserManagementRoutes {
  static async GetUserProfile(id) {
    return HTTPClient.get(`/users/profile/${id}`);
  }

  static async GetUsersPosts(id) {
    return HTTPClient.get(`/users/uploaded-posts/${id}`);
  }

  static async GetLikedPosts(id) {
    return HTTPClient.get(`/users/liked-posts/${id}`);
  }

  static async GetRepostedPosts(id) {
    return HTTPClient.get(`/users/reposted-posts/${id}`);
  }

  static async UpdateProfile(payload) {
    return HTTPClient.put(`/users/profile`, payload);
  }
}
