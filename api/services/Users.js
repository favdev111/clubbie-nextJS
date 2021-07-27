import HTTPClient from "../HTTPClient";

export default class UserManagementRoutes {
  static async GetUserProfile(id) {
    return HTTPClient.get(`/users/${id}/profile`);
  }

  static async GetMyProfile() {
    return HTTPClient.get("/users/my-profile");
  }

  static async GetUploadedPosts(id, query) {
    return HTTPClient.get(
      `/users/${id}/uploaded-posts/?${new URLSearchParams(query).toString()}`
    );
  }

  static async GetLikedPosts(id, query) {
    return HTTPClient.get(
      `/users/${id}/liked-posts/?${new URLSearchParams(query).toString()}`
    );
  }

  static async GetRepostedPosts(id, query) {
    return HTTPClient.get(
      `/users/${id}/reposted-posts/?${new URLSearchParams(query).toString()}`
    );
  }

  static async UpdateProfile(payload) {
    return HTTPClient.put(`/users/profile`, payload);
  }
}
