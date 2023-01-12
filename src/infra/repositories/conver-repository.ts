import {
  ConvertRepositoryParams,
  ConvertRepositoryProtocols,
} from '../protocols/convert-repository-protocols'
import { MongoProvider } from '../providers/mongodb'

export class ConvertRepository implements ConvertRepositoryProtocols {
  async save({
    userId,
    originCurrency,
    originAmount,
    destinationCurrency,
    currencyTax,
    timeConvert,
  }: ConvertRepositoryParams): Promise<any> {
    const convertColletion = MongoProvider.getCollection('current_convert')
    const res = await convertColletion.insertOne({
      userId,
      originCurrency,
      originAmount,
      destinationCurrency,
      currencyTax,
      timeConvert,
    })

    const result = await convertColletion.findOne({
      _id: res.insertedId,
    })
    return result
  }
}
