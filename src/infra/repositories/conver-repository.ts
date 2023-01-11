import { MongoProvider } from '../providers/mongodb'

export class ConvertRepository {
  async save({
    userId,
    originCurrency,
    originAmount,
    destinationCurrency,
    currencyTax,
    timeConvert,
  }) {
    const convertColletion = MongoProvider.getCollection('current_convert')
    const res = await convertColletion.insertOne({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      currencyTax,
      timeConvert,
    })

    const result = await convertColletion.findOne({ _id: res.insertedId })
    return result
  }
}
