import HTTPClient from '../HTTPClient'

export default class PostManagementRoutes {

    static async CreatePost(postId, payload) {
        return HTTPClient.post(`/posts/${postId}`, payload)
      }
    
      static async GetPost(query) {
        return HTTPClient.get(`/posts/`, query)
      }
    
      static async AppendChildPost(id, payload) {
        return HTTPClient.patch(`/posts/${id}`, payload)
      }
    
      static async DeletePost(id) {
        return HTTPClient.delete(`/posts/${id}`)
      }
    
      static async GetSinglePost(id) {
        return HTTPClient.patch(`/posts/${id}`)
      }
      
      static async UpdatePostbyId(id, payload) {
        return HTTPClient.put(`/posts/${id}`, payload)
      }

      static async Repost(id, query) {
        return HTTPClient.post(`/posts/${id}/repost`, query)
      }

}