import { MissingParamError } from '../errors/missing-param-error'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { HttpStatusCodes } from '../utils/http-status-codes'

export class TransactionController implements Controller {
  constructor(private readonly transactionsUsecase) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId } = httpRequest.params
    if (!userId) {
      return HttpStatusCodes.badRequest(new MissingParamError('userId'))
    }

    await this.transactionsUsecase.load({ userId })
  }
}
