import { ConvertUsecaseProtocols } from '../../domain/protocols/convent-usecase-protocols'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

const CURRENCIES = ['BRL', 'USD', 'EUR', 'JPY']
const FIELDS = [
  'userId',
  'originCurrency',
  'originAmount',
  'destinationCurrency',
]

export class ConventController implements Controller {
  constructor(private readonly convertUsecaseStub: ConvertUsecaseProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      for (const field of FIELDS) {
        if (!httpRequest.body[field]) {
          return HttpStatusCodes.badRequest(new MissingParamError(field))
        }
      }
      const { userId, originAmount, originCurrency, destinationCurrency } =
        httpRequest.body

      if (!CURRENCIES.includes(originCurrency.toUpperCase())) {
        return HttpStatusCodes.badRequest(new InvalidParamError(originCurrency))
      }

      if (!CURRENCIES.includes(destinationCurrency.toUpperCase())) {
        return HttpStatusCodes.badRequest(
          new InvalidParamError(destinationCurrency),
        )
      }

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
