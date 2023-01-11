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

const transactionsRepositoryStub = mockTransactionsRepository()

describe('TransactionsUsecase', () => {
  test('Should call TransactionsRepository with correct param', async () => {
    const spy = jest.spyOn(transactionsRepositoryStub, 'getTransactions')
    const sut = new TransactionsUsecase(transactionsRepositoryStub)
    await sut.load({ userId: '0312' })

    expect(spy).toHaveBeenCalledWith({ userId: '0312' })
  })
})
