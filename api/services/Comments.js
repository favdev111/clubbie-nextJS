import HTTPClient from '../HTTPClient'

export default class CommentManagementRoutes {

  static async CreateComment(postId, payload) {
    return HTTPClient.post(`/comments/${postId}`, payload)
  }

  static async UpdateComment(id, payload) {
    return HTTPClient.put(`/comments/${id}`, payload)
  }

  static async DeleteComment(id, payload) {
    return HTTPClient.delete(`/comments/${id}`, payload)
  }

  static async ReplyToComment(id, payload) {
    return HTTPClient.patch(`/comments/${id}`, payload)
  }

  static async UpdateCommentReply(id, replyId, payload) {
    return HTTPClient.patch(`/comments/${id}/${replyId  }`, payload)
  }
  
  static async DeleteReply(id,replyId,  payload) {
    return HTTPClient.delete(`/clubs/${id}/${replyId}`, payload)
  }

}