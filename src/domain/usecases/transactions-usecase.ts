export class TransactionsUsecase {
  constructor(private readonly transactionsRepository) {}

  async load({ userId }) {
    const trasactions = await this.transactionsRepository.getTransactions({
      userId,
    })

    return trasactions
  }
}
