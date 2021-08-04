import HTTPClient from "@api/HTTPClient";

export default class ClubManagementRoutes {
  static async Fetch(query) {
    return HTTPClient.get(`/clubs?${new URLSearchParams(query).toString()}`);
  }

  static async Get(id) {
    return HTTPClient.get(`/clubs/details?id=${id}`);
  }

  static async GetClubsWithDetails(ids) {
    return HTTPClient.get(
      `/clubs/details?${ids.map((id) => `id=${id}`).join("&")}`
    );
  }

  static async RegisterClub(payload) {
    return HTTPClient.post(`/clubs/register`, payload);
  }

  static async JoinClub(id) {
    return HTTPClient.patch(`/clubs/${id}/join`);
  }

  static async UpdateClub(id, payload) {
    return HTTPClient.put(`/clubs/${id}`, payload);
  }
}
