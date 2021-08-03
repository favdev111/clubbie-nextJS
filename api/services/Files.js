import HTTPClient from "../HTTPClient";

export default class UserManagementRoutes {
  static async UploadFile(filePurpose, payload, query = {}) {
    return HTTPClient.post(
      `/files/upload/?purpose=${filePurpose}${Object.entries(query).map(
        ([key, value]) => `&${key}=${value}`
      )}`,
      payload
    );
  }
}
