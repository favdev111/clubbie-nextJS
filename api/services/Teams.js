import HTTPClient from "@api/HTTPClient";

export default class TeamManagementRoutes {
  static async RegisterTeam(clubId, payload) {
    return HTTPClient.post(`/teams/register/${clubId}`, payload);
  }

  static async JoinTeam(id) {
    return HTTPClient.patch(`/teams/${id}/join`);
  }

  static async ChangeMemberStatusOfTeam() {
    return HTTPClient.patch(`/teams/${id}/member-status`);
  }

  static async LeaveATeam() {
    return HTTPClient.patch(`/teams/${id}/leave`);
  }

  static async GetTeamsWithDetail(query) {
    return HTTPClient.get(`/teams/details?${query}`);
  }

  static async GetTeamDashboard(id) {
    return HTTPClient.get(`/teams/${id}/team-dashboard`);
  }
}
