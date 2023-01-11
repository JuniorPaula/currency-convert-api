import { HttpResponse } from '../protocols/http'

export class HttpStatusCodes {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error,
    }
  }
}
