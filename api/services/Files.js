import HTTPClient from "../HTTPClient";

export default class UserManagementRoutes {
  static async UploadFile(filePurpose, payload) {
    return HTTPClient.post(`/files/upload/?purpose=${filePurpose}`, payload);
  }
}
