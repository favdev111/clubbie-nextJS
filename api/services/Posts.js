import HTTPClient from "../HTTPClient";

export default class PostManagementRoutes {
  static async CreatePost(payload) {
    return HTTPClient.post(`/posts/`, payload);
  }

  static async GetPosts(query) {
    return HTTPClient.get(`/posts/?${new URLSearchParams(query).toString()}`);
  }

  static async GetPostById(id) {
    return HTTPClient.get(`/posts/${id}`);
  }

  static async AppendChildPost(id, payload) {
    return HTTPClient.patch(`/posts/${id}`, payload);
  }

  static async RemoveChildPost(postId, childPostIds) {
    return HTTPClient.delete(
      `/posts/${postId}/childPosts?${childPostIds
        .map((id) => `childPostIds=${id}`)
        .join("&")}`
    );
  }

  static async DeletePost(id, params) {
    return HTTPClient.delete(`/posts/${id}/${params.type}`);
  }

  static async GetSinglePost(id) {
    return HTTPClient.patch(`/posts/${id}`);
  }

  static async UpdatePostbyId(id, payload) {
    return HTTPClient.put(`/posts/${id}`, payload);
  }

  static async Repost(id, query) {
    return HTTPClient.post(
      `/posts/${id}/repost?${new URLSearchParams(query).toString()}`
    );
  }
}
