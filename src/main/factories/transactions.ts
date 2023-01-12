import { TransactionsUsecase } from '../../domain/usecases/transactions-usecase'
import { TransactionsRepository } from '../../infra/repositories/transations-repository'
import { TransactionController } from '../../presentation/controllers/transactions-controller'

export const transactionFactory = (): TransactionController => {
  const transactionRepository = new TransactionsRepository()
  const transactionUsecase = new TransactionsUsecase(transactionRepository)

  return new TransactionController(transactionUsecase)
}
