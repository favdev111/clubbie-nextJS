import HTTPClient from "../HTTPClient";

export default class CommentManagementRoutes {
  static async GetComments(postId, query) {
    return HTTPClient.get(
      `/comments/${postId}?${new URLSearchParams(query).toString()}`
    );
  }

  static async CreateComment(postId, payload) {
    return HTTPClient.post(`/comments/${postId}`, payload);
  }

  static async UpdateComment(id, payload) {
    return HTTPClient.put(`/comments/${id}`, payload);
  }

  static async DeleteComment(id) {
    return HTTPClient.delete(`/comments/${id}`);
  }

  static async GetCommentReplies(commentId, query) {
    return HTTPClient.get(
      `/comments/${commentId}/replies?${new URLSearchParams(query).toString()}`
    );
  }

  static async ReplyToComment(id, payload) {
    return HTTPClient.patch(`/comments/${id}`, payload);
  }

  static async UpdateCommentReply(id, replyId, payload) {
    return HTTPClient.patch(`/comments/${id}/${replyId}`, payload);
  }

  static async DeleteReply(id, replyId) {
    return HTTPClient.delete(`/comments/${id}/${replyId}`);
  }
}
