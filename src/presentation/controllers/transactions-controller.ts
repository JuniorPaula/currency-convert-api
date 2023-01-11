import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class TransactionController implements Controller {
  constructor(private readonly transactionsUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      if (!userId) {
        return HttpStatusCodes.badRequest(new MissingParamError('userId'))
      }

      const transactions = await this.transactionsUsecase.load({ userId })

      return HttpStatusCodes.ok(transactions)
    } catch (err) {
      return HttpStatusCodes.serverError()
    }
  }
}
