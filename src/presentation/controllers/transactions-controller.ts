import { TransactionProtocols } from '../../domain/protocols/transaction-protocols'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class TransactionController implements Controller {
  constructor(private readonly transactionsUsecase: TransactionProtocols) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params
      const transactions = await this.transactionsUsecase.load({ userId })

      return HttpStatusCodes.ok(transactions)
    } catch (err) {
      return HttpStatusCodes.serverError()
    }
  }
}
