import HTTPClient from '../HTTPClient'

export default class ClubManagementRoutes {
  static async Fetch(query) {
    return HTTPClient.get(`/clubs`, query)
  }

  static async Get(id) {
    return HTTPClient.get(`/clubs/detail/${id}`)
  }

  static async Register(payload) {
    return HTTPClient.post(`/clubs/register`, payload)
  }

  static async JoinClubAsPlayer(id, payload) {
    return HTTPClient.patch(`/clubs/${id}/join`, payload)
  }

}