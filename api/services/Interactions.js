import HTTPClient from "../HTTPClient";

export default class PostInteractionManagementRoutes {
  static async LikePost(id) {
    return HTTPClient.post(`/content-interactions/`, {
      type: "post",
      action: "like",
      content: id,
    });
  }

  static async RemoveInteraction(id) {
    return HTTPClient.delete(`/content-interactions/${id}`);
  }

  static async ViewPost(id) {
    return HTTPClient.post(`/content-interactions/`, {
      type: "post",
      action: "view",
      content: id,
    });
  }
}
