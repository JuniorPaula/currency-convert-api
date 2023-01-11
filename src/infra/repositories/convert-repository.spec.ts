import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoProvider } from '../providers/mongodb'
import { ConvertRepository } from './conver-repository'

let convertColletion: Collection

const makeSut = () => {
  return new ConvertRepository()
}

describe('Item Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoProvider.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoProvider.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    convertColletion = MongoProvider.getCollection('current_convert')
    await convertColletion.deleteMany({})
  })

  test('Should return data save to be success', async () => {
    const sut = makeSut()
    const res = await sut.save({
      userId: '1234',
      originCurrency: 'BRL',
      originAmount: 123.5,
      destinationCurrency: 'USD',
      currencyTax: 0.192385,
      timeConvert: new Date(),
    })
    expect(res.userId).toBe('1234')
  })
})
