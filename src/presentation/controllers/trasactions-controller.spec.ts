import { ServerError } from '../errors/server-error'
import { HttpRequest } from '../protocols/http'
import { TransactionController } from './transactions-controller'

const mockTransactionsUsecase = () => {
  class TransactionsUsecaseStub {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load({ userId }) {
      return Promise.resolve([
        {
          trasactionId: '63bf20928a5c7d64453f1462',
          userId: '0321',
          originCurrency: 'USD',
          originAmount: 100,
          destinationCurrency: 'JPY',
          destinationValue: 13245.1985,
          currencyTax: 132.451985,
          timeConvert: '2023-01-11T20:48:18.523Z',
        },
      ])
    }
  }

  return new TransactionsUsecaseStub()
}

const makeSut = () => {
  const transactionsUsecaseStub = mockTransactionsUsecase()
  const sut = new TransactionController(transactionsUsecaseStub)

  return {
    sut,
    transactionsUsecaseStub,
  }
}

describe('TransactionController', () => {
  test('Should call TransactionsUsecase with correct values', async () => {
    const { sut, transactionsUsecaseStub } = makeSut()
    const spy = jest.spyOn(transactionsUsecaseStub, 'load')
    const httpRequest: HttpRequest = {
      params: {
        userId: '123',
      },
    }
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith({ userId: '123' })
  })

  test('Should return 500 if TransactionsUsecase throws', async () => {
    const { sut, transactionsUsecaseStub } = makeSut()
    jest
      .spyOn(transactionsUsecaseStub, 'load')
      .mockImplementationOnce(async () => {
        return await new Promise((resolve, reject) => reject(new Error()))
      })

    const httpRequest: HttpRequest = {
      params: {
        userId: '123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return a transactions on success', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {
        userId: '123',
      },
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([
      {
        trasactionId: '63bf20928a5c7d64453f1462',
        userId: '0321',
        originCurrency: 'USD',
        originAmount: 100,
        destinationCurrency: 'JPY',
        destinationValue: 13245.1985,
        currencyTax: 132.451985,
        timeConvert: '2023-01-11T20:48:18.523Z',
      },
    ])
  })
})
