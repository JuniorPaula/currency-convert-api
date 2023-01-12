import { MongoProvider } from '../providers/mongodb'

export class TransactionsRepository {
  async getTransactions({ userId }) {
    const convertColletion = MongoProvider.getCollection('current_convert')

    const transations = convertColletion
      .find({ userId }, { projection: { _id: 0 } })
      .toArray()
    return transations
  }
}
