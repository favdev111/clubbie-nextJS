import HTTPClient from '../HTTPClient'

export default class TeamManagementRoutes {

    static async RegisterTeam(clubId) {
        return HTTPClient.post(`/teams/register/${clubId}`)
      }
    
      static async JoinATeamAsPlayer(id) {
        return HTTPClient.patch(`/teams/${id}/join`)
      }
    
      static async ChangeMemberStatusOfTeam() {
        return HTTPClient.patch(`/teams/${id}/member-status`)      }

      static async LeaveATeam() {
        return HTTPClient.patch(`/teams/${id}/leave`)      }

      static async GetTeamsWithDetail(query) {
        return HTTPClient.get(`/teams/details`, query)
      }
}