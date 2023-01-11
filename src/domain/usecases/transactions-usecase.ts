export class TransactionsUsecase {
  constructor(private readonly transactionsRepository) {}

  async load({ userId }) {
    await this.transactionsRepository.getTransactions({ userId })
  }
}
