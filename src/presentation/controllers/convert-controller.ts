import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class ConventController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.userId) {
      return HttpStatusCodes.badRequest(new MissingParamError('userId'))
    }
    if (!httpRequest.body.originCurrency) {
      return HttpStatusCodes.badRequest(new MissingParamError('originCurrency'))
    }
  }
}
