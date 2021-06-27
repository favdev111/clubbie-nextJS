import HTTPClient from "../HTTPClient";

export default class SuggestedListManagementRoutes {
  static async GetAllSuggested() {
    return HTTPClient.get(`/suggestedLists/`);
  }

  static async GetSuggestedTeams() {
    return HTTPClient.get(`/suggestedList/teams`);
  }

  static async GetSuggestedClubs() {
    return HTTPClient.get(`/suggestedList/clubs`);
  }
}
