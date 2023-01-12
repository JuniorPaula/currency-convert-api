export type TransactionsRepositoryParam = {
  userId: string
}

export interface TransactionsRepositoryProtocol {
  getTransactions({ userId }: TransactionsRepositoryParam): Promise<any>
}
