import HTTPClient from "@api/HTTPClient";

export default class ClubManagementRoutes {
  static async Fetch(query) {
    return HTTPClient.get(`/clubs`, query);
  }

  static async Get(id) {
    return HTTPClient.get(`/clubs/details?id=${id}`);
  }

  static async RegisterClub(payload) {
    return HTTPClient.post(`/clubs/register`, payload);
  }

  static async JoinClub(id) {
    return HTTPClient.patch(`/clubs/${id}/join`);
  }
}
