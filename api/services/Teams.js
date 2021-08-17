import HTTPClient from "@api/HTTPClient";

export default class TeamManagementRoutes {
  static async Get(id) {
    return HTTPClient.get(`/teams/details?id=${id}`);
  }

  static async RegisterTeam(clubId, payload) {
    return HTTPClient.post(`/teams/register/${clubId}`, payload);
  }

  static async JoinTeamAsPlayer(id) {
    return HTTPClient.post(`/teams/${id}/player/join`);
  }

  static async ChangeMemberStatusOfTeam() {
    return HTTPClient.patch(`/teams/${id}/member-status`);
  }

  static async LeaveTeam(id) {
    return HTTPClient.patch(`/teams/${id}/leave`);
  }

  static async UpdateTeam(id, payload) {
    return HTTPClient.put(`/teams/${id}`, payload);
  }

  static async GetTeamsWithDetail(query) {
    return HTTPClient.get(`/teams/details?${query}`);
  }

  static async GetTeamsWithDetails(ids) {
    return HTTPClient.get(
      `/teams/details?${ids.map((id) => `id=${id}`).join("&")}`
    );
  }

  static async GetTeamDashboard(id) {
    return HTTPClient.get(`/teams/${id}/team-dashboard`);
  }

  static async AddSubscriptionPlan(id, payload) {
    return HTTPClient.post(`/teams/${id}/subscription-plan`, payload);
  }

  static async UpdateSubscriptionPlan(id, planType, payload) {
    return HTTPClient.patch(
      `/teams/${id}/subscription-plan/${planType}`,
      payload
    );
  }
}
