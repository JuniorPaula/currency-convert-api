import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class ConventController implements Controller {
  constructor(private readonly convertUsecaseStub) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = [
        'userId',
        'originCurrency',
        'originAmount',
        'destinationCurrency',
      ]

      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return HttpStatusCodes.badRequest(new MissingParamError(field))
        }
      }
      const { userId, originAmount, originCurrency, destinationCurrency } =
        httpRequest.body

      const amountConverted = await this.convertUsecaseStub.convert({
        userId,
        originAmount,
        originCurrency,
        destinationCurrency,
      })

      return HttpStatusCodes.ok(amountConverted)
    } catch (err) {
      return HttpStatusCodes.serverError()
    }
  }
}
