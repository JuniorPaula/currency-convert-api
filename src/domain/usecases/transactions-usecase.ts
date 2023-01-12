import { TransactionProtocols } from '../protocols/transaction-protocols'

export class TransactionsUsecase implements TransactionProtocols {
  constructor(private readonly transactionsRepository) {}

  async load({ userId }) {
    const trasactions = await this.transactionsRepository.getTransactions({
      userId,
    })

    return trasactions
  }
}
