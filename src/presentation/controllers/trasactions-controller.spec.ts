import { HttpRequest } from '../protocols/http'
import { TransactionController } from './transactions-controller'

const mockTransactionsUsecase = () => {
  class TransactionsUsecaseStub {
    async load(userId: string) {
      return null
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
  test('Should return 400 if userId is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {},
    }

    const httpResponse = await sut.handle(httpRequest)
    console.log(httpResponse)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toBe('missing param: userId')
  })

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
})
