import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class ConventController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields = ['userId', 'originCurrency', 'originAmount']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return HttpStatusCodes.badRequest(new MissingParamError(field))
      }
    }
  }
}
