import { TransactionsUsecase } from './transactions-usecase'

const mockTransactionsRepository = () => {
  class TransactionsRepositoryStub {
    userId: string
    async getTransactions({ userId }) {
      this.userId = userId

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

  return new TransactionsRepositoryStub()
}

const makeSut = () => {
  const transactionsRepositoryStub = mockTransactionsRepository()
  const sut = new TransactionsUsecase(transactionsRepositoryStub)

  return {
    sut,
    transactionsRepositoryStub,
  }
}

describe('TransactionsUsecase', () => {
  test('Should call TransactionsRepository with correct param', async () => {
    const { sut, transactionsRepositoryStub } = makeSut()
    const spy = jest.spyOn(transactionsRepositoryStub, 'getTransactions')
    await sut.load({ userId: '0312' })

    expect(spy).toHaveBeenCalledWith({ userId: '0312' })
  })

  test('Should throw if TransactionsRepository throws', async () => {
    const { sut, transactionsRepositoryStub } = makeSut()
    jest
      .spyOn(transactionsRepositoryStub, 'getTransactions')
      .mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.load({ userId: '0312' })
    await expect(promise).rejects.toThrow()
  })

  test('Should return a transactions if TransactionsRepository succeeds', async () => {
    const { sut } = makeSut()

    const transactions = await sut.load({ userId: '0312' })

    expect(transactions).toEqual([
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
