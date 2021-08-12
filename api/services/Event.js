import HTTPClient from "../HTTPClient";

export default class EventManagementRoutes {
  static async CreateEvent(payload) {
    return HTTPClient.post(`/event/register`, payload);
  }

  static async EditEventbyId(id, payload) {
    return HTTPClient.patch(`/event/${id}/edit`, payload);
  }

  static async CancelEventbyId(id) {
    return HTTPClient.patch(`/event/${id}/cancel`);
  }

  static async SetAvailability(id, payload) {
    return HTTPClient.patch(`/event/${id}/set-availability`, payload);
  }

  static async SetApproval(id, payload) {
    return HTTPClient.patch(`/event/${id}/set-approval`, payload);
  }

  static async UpdateTeamKit(id, payload) {
    return HTTPClient.patch(`/event/${id}/update-team-kit`, payload);
  }

  static async CreateLineup(id, payload) {
    return HTTPClient.patch(`/event/${id}/create-lineup`, payload);
  }

  static async FetchSingleEvent(eventId, teamId) {
    return HTTPClient.get(`/event/${eventId}?teamId=${teamId}`);
  }

  static async ConfirmLineup(id, payload) {
    return HTTPClient.patch(`/event/${id}/confirm-lineup`, payload);
  }

  static async AddResult(id, payload) {
    return HTTPClient.patch(`/event/${id}/add-result`, payload);
  }

  static async QueryEvents(query) {
    return HTTPClient.get(`/event`, query);
  }

  static async RequestPayment(id) {
    return HTTPClient.patch(`/event/${id}/request-payment`);
  }

  static async GetPlayerStatistics(id) {
    return HTTPClient.get(`/event/player-statistics?teamId=${id}`);
  }
  static async GetTeamStatistics(id) {
    return HTTPClient.get(`/event/team-statistics?teamId=${id}`);
  }

  static async GetAllTeamStatistics(id) {
    return HTTPClient.get(`/event/all-team-statistics`);
  }
}
