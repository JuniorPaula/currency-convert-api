import { TransactionsRepositoryProtocol } from '../../infra/protocols/transaction-repository-protocols'
import { TransactionProtocols } from '../protocols/transaction-protocols'

export class TransactionsUsecase implements TransactionProtocols {
  constructor(
    private readonly transactionsRepository: TransactionsRepositoryProtocol,
  ) {}

  async load({ userId }) {
    const trasactions = await this.transactionsRepository.getTransactions({
      userId,
    })

    return trasactions
  }
}
