import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { MongoProvider } from '../providers/mongodb'
import { TransactionsRepository } from './transations-repository'

let convertColletion: Collection

const makeSut = () => {
  return new TransactionsRepository()
}

describe('TransactionsUsecase', () => {
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

  test('Should return a trasactions on sucesss', async () => {
    const sut = makeSut()

    await convertColletion.insertMany([
      {
        trasactionId: '1',
        userId: 'asd-123',
        originCurrency: 'USD',
        originAmount: 100,
        destinationCurrency: 'JPY',
        destinationValue: 13245.1985,
        currencyTax: 132.451985,
        timeConvert: '2023-01-11T20:48:18.523Z',
      },
      {
        trasactionId: '2',
        userId: '123-asdf',
        originCurrency: 'USD',
        originAmount: 100,
        destinationCurrency: 'JPY',
        destinationValue: 13245.1985,
        currencyTax: 132.451985,
        timeConvert: '2023-01-11T20:48:18.523Z',
      },
      {
        trasactionId: '3',
        userId: 'asd-123',
        originCurrency: 'USD',
        originAmount: 100,
        destinationCurrency: 'JPY',
        destinationValue: 13245.1985,
        currencyTax: 132.451985,
        timeConvert: '2023-01-11T20:48:18.523Z',
      },
    ])

    const transactions = await sut.getTransactions({ userId: 'asd-123' })

    expect(transactions[0]).toEqual({
      trasactionId: '1',
      userId: 'asd-123',
      originCurrency: 'USD',
      originAmount: 100,
      destinationCurrency: 'JPY',
      destinationValue: 13245.1985,
      currencyTax: 132.451985,
      timeConvert: '2023-01-11T20:48:18.523Z',
    })
    expect(transactions[1]).toEqual({
      trasactionId: '3',
      userId: 'asd-123',
      originCurrency: 'USD',
      originAmount: 100,
      destinationCurrency: 'JPY',
      destinationValue: 13245.1985,
      currencyTax: 132.451985,
      timeConvert: '2023-01-11T20:48:18.523Z',
    })
  })
})
