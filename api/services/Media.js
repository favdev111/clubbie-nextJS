import HTTPClient from '../HTTPClient'

export default class MediaManagementRoutes {

  static async UploadFilesForDifferentPurposes(query, payload) {
    return HTTPClient.post(`/files/upload`, query, payload)
  }

  static async DeleteFiles(mediaIds) {
    return HTTPClient.delete(`/files/delete`, mediaIds)
  }

}