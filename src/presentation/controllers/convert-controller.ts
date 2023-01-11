import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class ConventController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.userId) {
      return {
        statusCode: 400,
        body: 'missing param: userId',
      }
    }
  }
}
