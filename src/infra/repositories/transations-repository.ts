import { TransactionsRepositoryProtocol } from '../protocols/transaction-repository-protocols'
import { MongoProvider } from '../providers/mongodb'

export class TransactionsRepository implements TransactionsRepositoryProtocol {
  async getTransactions({ userId }): Promise<any> {
    const convertColletion = MongoProvider.getCollection('current_convert')

    const transations = convertColletion
      .find({ userId }, { projection: { _id: 0 } })
      .toArray()
    return transations
  }
}
