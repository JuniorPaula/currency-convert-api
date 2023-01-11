import { TransactionsUsecase } from './transactions-usecase'

const mockTransactionsRepository = () => {
  class TransactionsRepositoryStub {
    userId: string
    async getTransactions({ userId }) {
      this.userId = userId
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
})
