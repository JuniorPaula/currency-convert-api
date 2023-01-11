import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export class HttpStatusCodes {
  static badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error,
    }
  }

  static serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(),
    }
  }
}
